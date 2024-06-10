import { Moment } from "moment";
import { z } from "zod";

export enum TideLevel {
  LOW = "L",
  HIGH = "H",
}

export enum Unit {
  IMPERIAL = "english",
  METRIC = "metric",
}

export enum TimeZone {
  GMT = "gmt",
  LST = "lst",
  DLST = "lst_ldt",
}

// export enum Product {
//   WATER_LEVELS = "Water Levels",
//   REPORTS = "Reports",
//   TIDE_PREDICTIONS = "Tide Predictions",
//   METEOROLOGICAL = "Meteorological",
//   PORTS = "PORTS",
//   OFS = "OFS",
//   BENCHMARKS = "Benchmarks",
//   SUPERCEDED_DATUMS = "Superceded Datums",
//   DATUMS = "Datums",
//   SUPERSCEEDED_DATUMS = "Supersceded Datums",
//   HARMONIC = "Harmonic",
//   SEA_LEVEL_TRENDS = "Sea Level Trends",
//   EXTREME_WATER_LEVELS = "Extreme Water Levels",
//   PHYSICAL_OCEANOGRAPHY = "Physical Oceanagraphy",
//   PORT_CODE = "PORT Code",
//   PORT_NAME = "PORT Name",
//   OFS_CODE = "OFS Code",
//   OFS_NAME = "OFS Name"
// }

// TODO: Refactor Date to be Moment
// Refactor date to be moment (requires tz - timezone to be populated first)
export interface TidePrediction {
  date: Date;
  height: number;
  type: TideLevel;
  unit: Unit;
}

export interface TidePredictions {
  predictions: TidePrediction[];
}

interface Product {
  name: string;
  link: string;
}

interface TidePredOffset {
  refStationId: string;
  type: string;
  heightOffsetLowTide: number | null;
  timeOffsetHighTide: number | null;
  timeOffsetLowTide: number | null;
  heightAdjustedType: string;
  self: string | null;
}

export interface Station {
  state: string;
  timezone: string;
  timezonecorr: number;
  id: string;
  reference_id: string;
  name: string;
  lat: number;
  lng: number;
  tideType: string;
  products: Product[];
  // referenceStation: Station | null;
}

// export const tidePredictionSchema = z.object({
//   t: z.string(),
//   v: z.string(),
//   type: z.enum(["L", "H"]),
// });

// export const tidePredictionsReponseSchema = z.object({
//   predictions: z.array(tidePredictionSchema),
// });

// export const stationSchema = z.object({
//   state: z.string(),
//   timezone: z.string(),
//   timezonecorr: z.number(),
//   observedst: z.boolean(),
//   stormsurge: z.boolean(),
//   id: z.string(),
//   name: z.string(),
//   lat: z.number(),
//   lng: z.number(),
//   tideType: z.string(),
//   products: z.any().nullable(),
// });

// export const stationResponseSchema = z.object({
//   count: z.number(),
//   stations: z.array(stationSchema),
// });
