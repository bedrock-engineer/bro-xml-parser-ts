/**
 * GMW (Grondwatermonitoringput / groundwater monitoring well) schema.
 *
 * Maps the dsgmw/1.1 registration object (`GMW_PPO` / `GMW_PO` / `GMW_O`, which
 * all share one leaf surface) to {@link GMWData}. The well is array-heavy: one or
 * more monitoring tubes (each with a flattened
 * materialUsed/screen/plainTubePart/sedimentSump/insertedPart surface and its own
 * geo-ohm cables → electrodes), an intermediate-event log, and surveyed
 * borehole-research ids.
 *
 * Field coverage is verified exhaustively against the official XSD with
 * `npm run check:xsd-coverage` (GMW: 0 gaps).
 *
 * Note on the intermediate-event `eventData` diff: the XSD nests, under each
 * `wellHistory/intermediateEvent`, an `eventData` change record whose leaf names
 * (tubeMaterial, glue, electrodePosition, ...) are a subset of the monitoring-tube
 * fields modelled below. That per-event diff is deliberately not expanded; the
 * current-state values live on the tubes.
 */

import { object_, array, text, date, number_, integer, boolean_ } from "../core/producer.js";
import type { Produced } from "../core/producer.js";
import {
  COMMON_REGISTRATION_PRODUCERS,
  REGISTRATION_HISTORY,
  gmlLocation,
} from "./common-fields.js";

/** One electrode on a geo-ohm cable. */
const ELECTRODE = object_({
  fields: {
    electrodeNumber: integer("./gmwcommon:electrodeNumber"),
    electrodePackingMaterial: text("./gmwcommon:electrodePackingMaterial"),
    electrodeStatus: text("./gmwcommon:electrodeStatus"),
    electrodePosition: number_("./gmwcommon:electrodePosition"),
  },
});

/** One geo-ohm cable running along a monitoring tube. */
const GEO_OHM_CABLE = object_({
  fields: {
    cableNumber: integer("./dsgmw:cableNumber"),
    cableInUse: text("./dsgmw:cableInUse"),
    electrodes: array({ each: "./dsgmw:electrode", item: ELECTRODE }),
  },
});

/** One monitoring tube, with its material/screen/insert surface flattened. */
const MONITORING_TUBE = object_({
  fields: {
    tubeNumber: integer("./dsgmw:tubeNumber"),
    tubeType: text("./dsgmw:tubeType"),
    artesianWellCapPresent: boolean_("./dsgmw:artesianWellCapPresent"),
    sedimentSumpPresent: boolean_("./dsgmw:sedimentSumpPresent"),
    numberOfGeoOhmCables: integer("./dsgmw:numberOfGeoOhmCables"),
    tubeTopDiameter: number_("./dsgmw:tubeTopDiameter"),
    variableDiameter: boolean_("./dsgmw:variableDiameter"),
    tubeStatus: text("./dsgmw:tubeStatus"),
    tubeTopPosition: number_("./dsgmw:tubeTopPosition"),
    tubeTopPositioningMethod: text("./dsgmw:tubeTopPositioningMethod"),
    tubePartInserted: boolean_("./dsgmw:tubePartInserted"),
    tubeInUse: text("./dsgmw:tubeInUse"),

    // materialUsed
    tubePackingMaterial: text("./dsgmw:materialUsed/gmwcommon:tubePackingMaterial"),
    tubeMaterial: text("./dsgmw:materialUsed/gmwcommon:tubeMaterial"),
    glue: text("./dsgmw:materialUsed/gmwcommon:glue"),

    // screen
    screenLength: number_("./dsgmw:screen/dsgmw:screenLength"),
    sockMaterial: text("./dsgmw:screen/dsgmw:sockMaterial"),
    screenProtection: text("./dsgmw:screen/dsgmw:screenProtection"),
    screenTopPosition: number_("./dsgmw:screen/dsgmw:screenTopPosition"),
    screenBottomPosition: number_("./dsgmw:screen/dsgmw:screenBottomPosition"),

    // plainTubePart
    plainTubePartLength: number_("./dsgmw:plainTubePart/gmwcommon:plainTubePartLength"),

    // sedimentSump
    sedimentSumpLength: number_("./dsgmw:sedimentSump/gmwcommon:sedimentSumpLength"),

    // insertedPart (present when tubePartInserted is true)
    insertedPartLength: number_("./dsgmw:insertedPart/gmwcommon:insertedPartLength"),
    insertedPartDiameter: number_("./dsgmw:insertedPart/gmwcommon:insertedPartDiameter"),
    insertedPartMaterial: text("./dsgmw:insertedPart/gmwcommon:insertedPartMaterial"),

    geoOhmCables: array({ each: "./dsgmw:geoOhmCable", item: GEO_OHM_CABLE }),
  },
});

/** One dated well-history event (name + date). */
const GMW_INTERMEDIATE_EVENT = object_({
  fields: {
    eventName: text("./dsgmw:eventName"),
    eventDate: date("./dsgmw:eventDate"),
  },
});

export const GMW_PRODUCER = object_({
  fields: {
    // === Core identification (shared brocom fields) ===
    ...COMMON_REGISTRATION_PRODUCERS,

    // === Well metadata ===
    withPrehistory: boolean_("./dsgmw:withPrehistory"),
    deliveryContext: text("./dsgmw:deliveryContext"),
    constructionStandard: text("./dsgmw:constructionStandard"),
    initialFunction: text("./dsgmw:initialFunction"),
    removed: boolean_("./dsgmw:removed"),
    numberOfMonitoringTubes: integer("./dsgmw:numberOfMonitoringTubes"),
    groundLevelStable: text("./dsgmw:groundLevelStable"),
    wellStability: text("./dsgmw:wellStability"),
    nitgCode: text("./dsgmw:nitgCode"),
    wellCode: text("./dsgmw:wellCode"),
    owner: text("./dsgmw:owner"),
    maintenanceResponsibleParty: text("./dsgmw:maintenanceResponsibleParty"),
    wellHeadProtector: text("./dsgmw:wellHeadProtector"),
    isAbroad: boolean_("./dsgmw:isAbroad"),
    geometricDataPubliclyAvailable: boolean_("./dsgmw:geometricDataPubliclyAvailable"),

    // === Location ===
    deliveredLocation: gmlLocation("./dsgmw:deliveredLocation/gmwcommon:location"),
    horizontalPositioningMethod: text(
      "./dsgmw:deliveredLocation/gmwcommon:horizontalPositioningMethod",
    ),
    standardizedLocation: gmlLocation("./dsgmw:standardizedLocation/brocom:location"),
    coordinateTransformation: text("./dsgmw:standardizedLocation/brocom:coordinateTransformation"),

    // === Vertical position ===
    deliveredVerticalPositionOffset: number_("./dsgmw:deliveredVerticalPosition/gmwcommon:offset"),
    deliveredVerticalPositionDatum: text(
      "./dsgmw:deliveredVerticalPosition/gmwcommon:verticalDatum",
    ),
    deliveredVerticalPositionReferencePoint: text(
      "./dsgmw:deliveredVerticalPosition/gmwcommon:localVerticalReferencePoint",
    ),
    groundLevelPosition: number_("./dsgmw:deliveredVerticalPosition/gmwcommon:groundLevelPosition"),
    groundLevelPositioningMethod: text(
      "./dsgmw:deliveredVerticalPosition/gmwcommon:groundLevelPositioningMethod",
    ),

    // === Well history ===
    wellConstructionDate: date("./dsgmw:wellHistory/dsgmw:wellConstructionDate"),
    wellRemovalDate: date("./dsgmw:wellHistory/dsgmw:wellRemovalDate"),
    intermediateEvents: array({
      each: "./dsgmw:wellHistory/dsgmw:intermediateEvent",
      item: GMW_INTERMEDIATE_EVENT,
    }),

    // === Monitoring tubes (with geo-ohm cables / electrodes) ===
    monitoringTubes: array({ each: "./dsgmw:monitoringTube", item: MONITORING_TUBE }),

    // === Related surveys ===
    surveyBoreholeResearchIds: array({
      each: "./dsgmw:survey",
      item: text(".//*[local-name()='broId']"),
    }),

    // === Administrative history ===
    registrationHistory: REGISTRATION_HISTORY,
  },
});

/** One electrode on a geo-ohm cable. Inferred from {@link ELECTRODE}. @internal */
export type Electrode = Produced<typeof ELECTRODE>;
/** One geo-ohm cable on a monitoring tube. Inferred from {@link GEO_OHM_CABLE}. @internal */
export type GeoOhmCable = Produced<typeof GEO_OHM_CABLE>;
/** One monitoring tube. Inferred from {@link MONITORING_TUBE}. @internal */
export type MonitoringTube = Produced<typeof MONITORING_TUBE>;
/** One dated well-history event. Inferred from {@link GMW_INTERMEDIATE_EVENT}. @internal */
export type GMWIntermediateEvent = Produced<typeof GMW_INTERMEDIATE_EVENT>;
