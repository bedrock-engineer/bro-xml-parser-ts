// Copy the generated TypeDoc Markdown into the bedrock-astro website repo.
//
// Assumes bedrock-astro sits next to this repo:
//   bedrock-repos/ours/bro-xml-parser-ts   <- here
//   bedrock-repos/ours/bedrock-astro       <- target
//
// Override the target with BRO_DOCS_TARGET if your layout differs.
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const source = resolve(root, "docs/api");
const target = process.env.BRO_DOCS_TARGET
  ? resolve(process.env.BRO_DOCS_TARGET)
  : resolve(
      root,
      "../bedrock-astro/src/content/docs/docs/bro-xml-parser/reference/API",
    );

if (!existsSync(source)) {
  console.error(`No generated docs at ${source}. Run "npm run docs:api" first.`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

// TypeDoc emits page-to-page links as relative paths that keep the source
// casing and a `.md` extension (e.g. `../General/Location.md`). Starlight serves
// every page at a lowercased, extensionless URL, so those links 404 and fail
// link validation. Rewrite them to absolute Starlight URLs derived from each
// file's location under `src/content/docs`.
const marker = `${sep}src${sep}content${sep}docs${sep}`;
const markerIdx = target.indexOf(marker);
if (markerIdx === -1) {
  console.error(`Cannot derive the site URL base from target path: ${target}`);
  process.exit(1);
}
const contentDocsRoot = target.slice(0, markerIdx + marker.length - 1);

function toStarlightUrl(absMdPath) {
  // Match Astro's slug: lowercase and drop dots. TypeDoc names namespace
  // members with a dot (e.g. `resolvers.parseFloat.md`), which Astro slugifies
  // to `resolversparsefloat`.
  const parts = relative(contentDocsRoot, absMdPath)
    .replace(/\.md$/i, "")
    .split(sep)
    .map((part) => part.toLowerCase().replace(/\./g, ""));
  if (parts[parts.length - 1] === "index") parts.pop();
  return `/${parts.join("/")}/`;
}

function* walkMarkdown(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) yield* walkMarkdown(full);
    else if (entry.isFile() && entry.name.endsWith(".md")) yield full;
  }
}

// Matches Markdown links to a relative `.md` file (skips absolute, external and
// pure-anchor links). Captures any trailing `#anchor`/`?query` as a suffix.
const relativeMdLink = /\]\((?!\/|https?:|#)([^)#?]+?\.md)([^)]*)\)/gi;

let rewritten = 0;
for (const file of walkMarkdown(target)) {
  const fileDir = dirname(file);
  const original = readFileSync(file, "utf8");
  const updated = original.replace(relativeMdLink, (_match, relLink, suffix) => {
    rewritten += 1;
    return `](${toStarlightUrl(resolve(fileDir, relLink))}${suffix})`;
  });
  if (updated !== original) writeFileSync(file, updated);
}

console.log(`Synced API docs -> ${target}`);
console.log(`Rewrote ${rewritten} internal links to Starlight URLs.`);
