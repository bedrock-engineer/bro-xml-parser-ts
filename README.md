# @bedrock-engineer/bro-xml-parser

TypeScript parser library for Dutch [Basisregistratie Ondergrond](https://basisregistratieondergrond.nl/) (BRO) XML data, focussing on geotechnical and geological data.

The [BRO contains many registration object types](https://basisregistratieondergrond.nl/inhoud-bro/registratieobjecten/). This library currently only covers three:

1. **CPT** (Cone Penetration Test)
2. **BHR-GT** (Geotechnical Borehole)
3. **BHR-G** (Geological Borehole)

No dependencies in browser. For use in node.js, you need to install two extra dependencies.

**Live demo:** [bro.bedrock.engineer](https://bro.bedrock.engineer/) ([source](https://github.com/bedrock-engineer/bro-xml-app))

> **Pre-1.0:** This library is under active development. Minor versions may include breaking changes.

## Installation

```bash
npm install @bedrock-engineer/bro-xml-parser

# Node.js also requires:
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

```typescript
import {
  BROParser,
  XMLAdapter,
  resolvers,
} from "@bedrock-engineer/bro-xml-parser/node";

const parser = new BROParser(new XMLAdapter());

const mySchema = {
  id: { xpath: "brocom:broId" },
  depth: { xpath: ".//cptcommon:finalDepth", resolver: resolvers.parseFloat },
  location: {
    xpath: "./dscpt:deliveredLocation/cptcommon:location",
    resolver: resolvers.parseGMLLocation,
  },
};

const result = parser.parseCustom(xmlText, mySchema, "CPT");
// { id: "CPT000000099543", depth: 25.5, location: { x: 155000, y: 463000, epsg: "28992" } }
```

## API

| Method                            | Returns     | Description                |
| --------------------------------- | ----------- | -------------------------- |
| `parse(xml)`                      | `BROData`   | Auto-detect type and parse |
| `parseCPT(xml)`                   | `CPTData`   | Parse CPT file             |
| `parseBHRGT(xml)`                 | `BHRGTData` | Parse BHR-GT file          |
| `parseBHRG(xml)`                  | `BHRGData`  | Parse BHR-G file           |
| `parseCustom(xml, schema, type?)` | `T`         | Parse with custom schema   |

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
