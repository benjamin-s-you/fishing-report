import "server-only";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { Station, TidePrediction, TidePredictions } from "@/app/lib/tide/types";
import Utils from "@/utils/utils";
import { mapToStation, mapToTidePrediction } from "@/app/lib/tide/helpers";
import { Moment } from "moment";

export async function fetchAllStations(): Promise<Station[]> {
  noStore();
  try {
    const url: string = Utils.getAllStationsUrl();
    const response: Response = await fetch(url);
    const data = await response.json();

    const stations: Station[] = data.stations.map((station: any) => {
      return mapToStation(station);
    });

    return stations;
  } catch (error) {
    console.error("Error fetching all stations:", error);
    throw new Error("Failed to fetch all stations");
  }
}

export async function fetchStationData(stationId: string): Promise<Station> {
  try {
    const url = Utils.getStationUrl(stationId);
    const response = await fetch(url);
    const data = await response.json();

    const station: Station = {
      state: data.stations[0].state,
      timezone: data.stations[0].timezone,
      timezonecorr: data.stations[0].timezonecorr,
      reference_id: data.stations[0].reference_id,
      id: data.stations[0].id,
      name: data.stations[0].name,
      lat: data.stations[0].lat,
      lng: data.stations[0].lng,
      tideType: data.stations[0].tideType,
      products: data.stations[0].products,
    };

    return station;
  } catch (error) {
    console.error("Error fetching station", error);
    throw new Error("Failed to fetch station");
  }
}

export async function fetchTideData(
  stationId: string,
  beginDate: Moment,
  timeZone: string = "lst_ldt",
  unit: string = "english"
): Promise<TidePrediction[]> {
  try {
    const url = Utils.getTidePredictionsUrl(
      beginDate, // eventually get from state object
      stationId, // eventually get from state object
      timeZone, // eventually get from state object
      unit // eventually get from state object
    );

    const response: any = await axios.get(url);
    const data: any = response.data.predictions;

    const predictions: TidePrediction[] = data.map((prediction: any) => {
      return mapToTidePrediction(prediction, unit);
    });

    return predictions;
  } catch (error) {
    console.error("Error fetching tide data:", error);
    throw new Error("Failed to fetch tide data");
  }
}
