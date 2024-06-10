import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { Station, TidePrediction, TidePredictions } from "@/app/lib/tide/types";
import Utils from "@/utils/utils";
import { mapToStation, mapToTidePrediction } from "@/app/lib/tide/helpers";
import { Moment } from "moment";

export async function fetchAllStations(): Promise<Station[]> {
  try {
    noStore();
    const url = Utils.getAllStationsUrl();
    const response = await axios.get(url);
    const data = response.data.stations;
    const stations: Station[] = data.map((station: any) => {
      return mapToStation(station);
    });

    return stations;
  } catch (error) {
    console.error("Error fetching all stations:", error);
    throw new Error("Failed to fetch all stations");
  }
}

// // eventually get from state object - stationId
// export async function fetchStationData(stationId: number): Promise<Station> {
//   noStore();

//   const url = Utils.getStationUrl(stationId);
//   const response = await axios.get(url);
//   const data = response.data.stations[0];

// const station: Station = {
//   state: data.state,
//   timezone: data.timezone,
//   timezonecorr: data.timezonecorr,
//   reference_id: data.reference_id,
//   id: data.id,
//   name: data.name,
//   lat: data.lat,
//   lng: data.lng,
//   tideType: data.tideType,
//   products: data.products,
//   referenceStation:
//     data.reference_id !== undefined
//       ? (data.tidePredOffsets = await fetchStationData(
//           parseInt(data.reference_id)
//         ))
//       : null,
// };

//   return station;
// }

export async function fetchTideData(
  stationId: number,
  beginDate: Moment,
  timeZone: string = "lst_ldt",
  unit: string = "english"
): Promise<TidePredictions> {
  try {
    noStore();
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

    return { predictions: predictions };
  } catch (error) {
    console.error("Error fetching tide data:", error);
    throw new Error("Failed to fetch tide data");
  }
}
