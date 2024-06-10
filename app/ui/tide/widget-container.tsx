/**
 * Marked as Server Component
 */

import { fetchTideData } from "@/app/lib/tide/api";
import { TideLevel, TidePrediction } from "@/app/lib/tide/types";
import { filterTodayData, getTideLevelText } from "@/app/lib/helpers";
import { Card } from "@nextui-org/react";
import { TideChart } from "@/app/ui/tide/graph";
import moment, { Moment } from "moment";
import { getYesterdayMoment } from "@/app/lib/tide/helpers";
import { globalStore } from "@/app/store/global";
import { useEffect } from "react";

export default async function TideWidgetContainer({
  stationId,
}: {
  stationId: string;
}) {
  /**
   * Move to Dashboard component
   */
  const now = moment();
  const yesterday = moment(now).startOf("day").subtract(1, "day");
  const tidePredictions: TidePrediction[] = await fetchTideData(
    stationId,
    yesterday
  );

  const todayTides: TidePrediction[] = filterTodayData(tidePredictions);
  const nextTide: TidePrediction | undefined = tidePredictions.find(
    (
      prediction // refactor this to helper
    ) => moment(prediction.date).isAfter(now)
  );

  const hoursUntilNextTide = nextTide // refactor this to helper
    ? moment(nextTide.date).diff(now, "hours")
    : null;

  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="inline-flex items-center w-3/5 h-9 p-2 rounded-lg bg-default-200 text-lg">
        Tide
      </div>
      <div className="rounded-lg bg-default-300 p-4">
        {nextTide ? (
          <div className="text-center">{`${hoursUntilNextTide} hour(s) until next ${getTideLevelText(
            nextTide.type
          )} tide`}</div>
        ) : (
          <></>
        )}
        <TideChart tideData={tidePredictions} />

        {todayTides.map((tide, key) => {
          const timeFormatted: string = moment(tide.date).format("h:mm A");
          const level: TideLevel = tide.type as TideLevel;
          const height: number = tide.height.toFixed(2);
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
