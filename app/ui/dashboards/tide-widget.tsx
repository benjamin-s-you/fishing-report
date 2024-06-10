import { fetchTideData } from "@/app/lib/tide/api";
import { TideLevel, TidePredictions } from "@/app/lib/tide/types";
import { filterTodayData, getTideLevelText } from "@/app/lib/helpers";
import { Card } from "@nextui-org/react";
import { TideChart } from "@/app/ui/dashboards/tide-chart";
import moment from "moment";
import { getYesterdayMoment } from "@/app/lib/tide/helpers";
import { stationStore } from "@/app/store/station";

export async function TideWidget() {
  // const station = stationStore((state: any) => state.station);

  const stationId: number = 8516385;
  const now = moment(); // move this to state
  const yesterday = getYesterdayMoment(); // eventually get rid once now becomes state object

  const tideData: TidePredictions = await fetchTideData(stationId, yesterday);

  const todayTides = filterTodayData(tideData.predictions);
  const nextTide = tideData.predictions.find(
    (
      prediction // refactor this to helper
    ) => moment(prediction.date).isAfter(now)
  );
  const hoursUntilNextTide = nextTide // refactor this to helper
    ? moment(nextTide.date).diff(now, "hours")
    : null;

  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="h-9 w-3/5 rounded-lg bg-default-200">Tide</div>
      <div className="rounded-lg bg-default-300 p-4">
        {nextTide ? (
          <div className="text-center">{`${hoursUntilNextTide} hour(s) until ${getTideLevelText(
            nextTide.type
          )} tide`}</div>
        ) : (
          <></>
        )}
        <TideChart tideData={tideData} />

        {todayTides.map((tide, key) => {
          const timeFormatted = moment(tide.date).format("h:mm A");
          const level = tide.type as TideLevel;
          const height = tide.height;
          return (
            <div
              key={key}
              className={`grid gap-6 sm:grid-cols-3 lg:grid-cols-3 ${
                now.isAfter(tide.date) ? "text-red-600" : "text-blue-600"
              }`}
            >
              <div className="text-center">{timeFormatted}</div>
              <div className="text-center">{getTideLevelText(level)}</div>
              <div className="text-center">{height} ft</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>

        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </div>
    </Card>
  );
}
