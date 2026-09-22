# @bedrock-engineer/bro-xml-parser

> **Pre-1.0:** This library is under active development. Minor versions may include breaking changes.

TypeScript parser library for Dutch [Basisregistratie Ondergrond](https://basisregistratieondergrond.nl/) (BRO) XML data, focussing on geotechnical and geological data.

The [BRO contains many registration object types](https://basisregistratieondergrond.nl/inhoud-bro/registratieobjecten/). This library currently only covers three:

1. **CPT** (Cone Penetration Test)
2. **BHR-GT** (Geotechnical Borehole)
3. **BHR-G** (Geological Borehole)

Support for more registration object types is desired but not our curent focus. PRs are welcome.

**Live demo:** [bro.bedrock.engineer](https://bro.bedrock.engineer/) ([source](https://github.com/bedrock-engineer/bro-xml-app))

## Installation

No dependencies in the browser.

```bash
npm install @bedrock-engineer/bro-xml-parser
```

For use in node.js, you need to install two extra dependencies.

```
npm install @xmldom/xmldom fontoxpath
```

## Usage

**Browser** (zero dependencies):

```typescript
import { BROParser, XMLAdapter } from "@bedrock-engineer/bro-xml-parser";

const parser = new BROParser(new XMLAdapter());
const cpt = parser.parseCPT(xmlText);
```

**Node.js** (requires peer deps):

```typescript
import { BROParser, XMLAdapter } from "@bedrock-engineer/bro-xml-parser/node";

const parser = new BROParser(new XMLAdapter());

// Auto-detect file type
const data = parser.parse(xmlText);
console.log(data.meta.dataType); // 'CPT' | 'BHR-GT' | 'BHR-G'

// Or parse specific types
const cpt = parser.parseCPT(xmlText);
const bhr_gt = parser.parseBHRGT(xmlText);
const bhr_g = parser.parseBHRG(xmlText);
```

## Custom Schemas

Extract only the fields you need:

Build a schema from the `producers` combinators — a map of field name → producer.
The return type is inferred from the map, so `result.depth` is `number | null`,
`result.location` is `Location | null`, with no casts:

```typescript
import { BROParser, XMLAdapter, producers as p } from "@bedrock-engineer/bro-xml-parser/node";

const parser = new BROParser(new XMLAdapter());

const result = parser.parseCustom(
  xmlText,
  {
    id: p.text("brocom:broId"),
    depth: p.number(".//cptcommon:finalDepth"),
    location: p.gmlLocation("./dscpt:deliveredLocation/cptcommon:location"),
  },
  "CPT",
);
// { id: "CPT000000099543", depth: 25.5, location: { x: 155000, y: 463000, epsg: "28992" }, meta: {…} }
```

The `producers` namespace carries every building block the library uses internally:
scalar combinators (`text`, `number`, `integer`, `date`, `boolean`, `qualityClass`),
structural combinators (`object`, `array`, `oneOf`, `custom`), the domain helpers
(`gmlLocation`, `columns`), and the shared field-maps (`COMMON_REGISTRATION_PRODUCERS`,
`REGISTRATION_HISTORY`) you can spread into a schema.

## API

| Method                            | Returns     | Description                |
| --------------------------------- | ----------- | -------------------------- |
| `parse(xml)`                      | `BROData`   | Auto-detect type and parse |
| `parseCPT(xml)`                   | `CPTData`   | Parse CPT file             |
| `parseBHRGT(xml)`                 | `BHRGTData` | Parse BHR-GT file          |
| `parseBHRG(xml)`                  | `BHRGData`  | Parse BHR-G file           |
| `parseCustom(xml, fields, type?)` | `T`         | Parse with a producer map  |

See [`src/types/index.ts`](./src/types/index.ts) for full type definitions.

## Supported Schemas

| Type   | Schema Version | Link                                                                                                                                                              |
| ------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPT    | `dscpt/1.1`    | [BRO CPT docs](https://basisregistratieondergrond.nl/inhoud-bro/registratieobjecten/bodem-grondonderzoek/geotechnisch-sondeeronderzoek-cpt/)                      |
| BHR-GT | `dsbhr-gt/2.1` | [BRO BHR-GT docs](https://basisregistratieondergrond.nl/inhoud-bro/registratieobjecten/bodem-grondonderzoek/booronderzoek-bhr/geotechnisch-booronderzoek-bhr-gt/) |
| BHR-G  | `dsbhrg/3.1`   | [BRO BHR-G docs](https://basisregistratieondergrond.nl/inhoud-bro/registratieobjecten/bodem-grondonderzoek/booronderzoek-bhr/geologisch-booronderzoek-bhr/)       |

## Reference Codes

BRO/XML values use camelCase domain codes like `"langwerpig"`, `"mechanischDiscontinu"`, or `"ISO19901d8v2014"` some are intuitive, some are cryptic. The BRO publishes official human-readable descriptions for all of these codes.

This library exports lookup functions auto-generated from the [BRO reference codes API](https://publiek.broservices.nl/bro/refcodes/v1/codes), so you can resolve any code to its full description:

```typescript
import { getBhrgtGeotechnicalSoilNameDescription } from "@bedrock-engineer/bro-xml-parser/reference-codes";

const bore = parser.parseBHRGT(xmlText);

bore.data.forEach((layer) => {
  const description = getBhrgtGeotechnicalSoilNameDescription(layer.geotechnicalSoilName);
  console.log(`${layer.upperBoundary}–${layer.lowerBoundary}m: ${description}`);
  // e.g. "0–2m: Grove minerale grond, waarvan de grove fractie uit zand bestaat..."
});
```

Run `npm run codegen:reference-codes` to regenerate the lookup tables from the latest API.

## License

Apache 2.0 — [Jules Blom](https://julesblom.com) at [Bedrock.engineer](https://bedrock.engineer)
