// @ts-check
/**
 * Local TypeDoc plugin with three jobs:
 *
 * 1. Add a Starlight-compatible `title` to each generated Markdown page's
 *    frontmatter.
 * 2. Drop exported `const` values (schemas, presets, namespace tables) from the
 *    reference. Their generated pages are large object dumps that add noise
 *    without much value; they are covered in prose instead.
 * 3. Group the API reference index by data type (General, CPT, BHR-GT, BHR-G)
 *    instead of by kind, with the BHR-GT lab-analysis (BMA) interfaces as a
 *    "Lab analysis" sub-section under BHR-GT.
 *
 * Grouping uses TypeDoc's `@group`/`@category` mechanism: we inject those tags
 * onto each reflection's comment before GroupPlugin (RESOLVE_END, priority -100)
 * and CategoryPlugin (-200) run. `defaultCategory: "none"` in typedoc.json keeps
 * the un-categorized members of each group flat (no sub-heading).
 *
 * A type's group is derived by REACHABILITY from each `*Data` root (walking
 * property types), not from a hardcoded name list: a type reachable from exactly
 * one of CPTData / BHRGTData / BHRGData belongs to that domain; anything shared
 * (reachable from several) or unreachable (parser, adapters, base interfaces,
 * schema/resolver types) falls through to "General". This is self-maintaining -
 * new domain types are placed automatically, the same way the lab-analysis
 * subtree is discovered from BoreholeSampleAnalysis.
 */
import { Comment, CommentTag, Converter, ReflectionKind } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/** @param {import("typedoc").Reflection} reflection */
function addTag(reflection, tag, value) {
  if (!reflection.comment) reflection.comment = new Comment();
  reflection.comment.blockTags.push(
    new CommentTag(/** @type {`@${string}`} */ (tag), [{ kind: "text", text: value }]),
  );
}

/** Reflections referenced by a type (reference, array, union, intersection). */
function referencedReflections(type, topLevel, out = []) {
  if (!type) return out;
  if (type.type === "reference" && type.reflection && topLevel.has(type.reflection)) {
    out.push(type.reflection);
  } else if (type.type === "array") {
    referencedReflections(type.elementType, topLevel, out);
  } else if (type.type === "union" || type.type === "intersection") {
    for (const t of type.types ?? []) referencedReflections(t, topLevel, out);
  }
  return out;
}

/** Every top-level interface reachable from `seed` by walking property types.
 * Used to find the whole BHR-GT-BMA lab-analysis tree without hardcoding it. */
function collectReachable(seed, topLevel, acc) {
  if (!seed || acc.has(seed)) return acc;
  acc.add(seed);
  // Interface/class properties.
  for (const child of seed.children ?? []) {
    for (const ref of referencedReflections(child.type, topLevel)) {
      collectReachable(ref, topLevel, acc);
    }
  }
  // Type-alias definition, e.g. a union of interfaces like
  // `BHRGTLayer = BHRGTSoilLayer | BHRGTRockLayer` — follow into its members.
  if (seed.type) {
    for (const ref of referencedReflections(seed.type, topLevel)) {
      collectReachable(ref, topLevel, acc);
    }
  }
  return acc;
}

/** @param {import("typedoc").Application} app */
export function load(app) {
  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
    const { project } = context;

    for (const reflection of project.getReflectionsByKind(ReflectionKind.Variable)) {
      project.removeReflection(reflection);
    }

    // Removing variables can leave a namespace (e.g. `presets`) with no
    // members. Prune those so the sidebar and index don't link empty pages.
    for (const namespace of project.getReflectionsByKind(ReflectionKind.Namespace)) {
      if (!namespace.children?.length) {
        project.removeReflection(namespace);
      }
    }
  });

  // Runs after types are resolved (RESOLVE) but before GroupPlugin/CategoryPlugin
  // (RESOLVE_END, priority -100/-200), so the injected tags are honoured.
  app.converter.on(
    Converter.EVENT_RESOLVE_END,
    (context) => {
      const children = context.project.children ?? [];
      const topLevel = new Set(children);

      const reachFrom = (name) => {
        const seed = children.find((c) => c.name === name);
        return seed ? collectReachable(seed, topLevel, new Set()) : new Set();
      };
      const cpt = reachFrom("CPTData");
      const bhrgt = reachFrom("BHRGTData");
      const bhrg = reachFrom("BHRGData");
      const gmw = reachFrom("GMWData");
      const gld = reachFrom("GLDData");
      const lab = reachFrom("BoreholeSampleAnalysis");

      // A type belongs to a domain only if reachable from exactly one *Data root;
      // shared (multiple) or unreachable (base/parser/schema) types -> General.
      const groupFor = (reflection) => {
        const hits =
          (cpt.has(reflection) ? 1 : 0) +
          (bhrgt.has(reflection) ? 1 : 0) +
          (bhrg.has(reflection) ? 1 : 0) +
          (gmw.has(reflection) ? 1 : 0) +
          (gld.has(reflection) ? 1 : 0);
        if (hits !== 1) return "General";
        if (cpt.has(reflection)) return "CPT";
        if (bhrgt.has(reflection)) return "BHR-GT";
        if (bhrg.has(reflection)) return "BHR-G";
        if (gmw.has(reflection)) return "GMW";
        return "GLD";
      };

      for (const reflection of children) {
        if (lab.has(reflection)) {
          // Lab-analysis (BMA) interfaces: a "Lab analysis" category under BHR-GT.
          addTag(reflection, "@group", "BHR-GT");
          addTag(reflection, "@category", "Lab analysis");
        } else if (reflection.name === "resolvers") {
          // The resolvers namespace and its functions get their own section.
          // With the `group` router these functions would otherwise be routed
          // by kind into a stray top-level "Functions" folder.
          addTag(reflection, "@group", "Resolvers");
          for (const child of reflection.children ?? []) {
            addTag(child, "@group", "Resolvers");
          }
        } else {
          addTag(reflection, "@group", groupFor(reflection));
        }
      }
    },
    1000,
  );

  app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
    const isProjectRoot = page.model === page.project;
    const title = isProjectRoot ? "API Reference" : page.model.name;

    page.frontmatter = {
      title,
      ...page.frontmatter,
    };
  });
}
