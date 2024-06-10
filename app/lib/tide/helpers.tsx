import { TideLevel, Unit } from "@/app/lib/tide/types";
import moment from "moment";

export function getYesterdayMoment() {
  return moment().startOf("day").subtract(1, "days");
}

export function mapToTidePrediction(data: any, unit: string) {
  return {
    date: new Date(data.t),
    height: parseFloat(data.v),
    type: data.type as TideLevel,
    unit: unit as Unit,
  };
}

export function mapToStation(data: any) {
  const station = {
    state: data.state,
    timezone: data.timezone,
    timezonecorr: data.timezonecorr,
    reference_id: data.reference_id,
    id: data.id,
    name: data.name,
    lat: data.lat,
    lng: data.lng,
    tideType: data.tideType,
    products: data.products,
    // referenceStation: null,
  };

  // if (data.reference_id !== undefined) {
  //     station.referenceStation = await fetchStationData(parseInt(data.reference_id));
  // }

  return station;
}
