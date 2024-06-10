import { TideLevel } from "@/app/lib/tide/types";
import moment from "moment";

export function getTideLevelText(tideLevel: TideLevel): string {
  switch (tideLevel) {
    case TideLevel.LOW:
      return "Low";
    case TideLevel.HIGH:
      return "High";
    default:
      return "UNKNOWN";
  }
}

// TODO: Test this with time zone differences
export function filterTodayData(data: any[]) {
  const today = moment().format("YYYY-MM-DD");
  return data.filter(
    (item) => moment(item.date).format("YYYY-MM-DD") === today
  );
}
