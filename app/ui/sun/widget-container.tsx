import { fetchSunData } from "@/app/lib/sun/api";
import { SunInfo } from "@/app/lib/sun/types";
import { fetchStationData } from "@/app/lib/tide/api";
import { Station } from "@/app/lib/tide/types";
import { Coordinates } from "@/app/lib/types";
import { Card } from "@nextui-org/react";
import moment, { Moment } from "moment-timezone";

export default async function SunWidgetContainer({
  stationId,
}: {
  stationId: string;
}) {
  function calculateTimeDifference(startTime: Moment, endTime: Moment) {
    if (startTime.isAfter(endTime)) {
      return {
        hours: 0,
        minutes: 0,
      };
    } else {
      const diffMilliseconds = endTime.diff(startTime);
      const duration = moment.duration(diffMilliseconds);
      return {
        hours: duration.hours(),
        minutes: duration.minutes(),
      };
    }
  }

  const station: Station = await fetchStationData(stationId);
  const coordinates: Coordinates = {
    latitude: station.lat,
    longitude: station.lng,
  };
  const dateStart = moment().startOf("day");
  const dateEnd = moment().startOf("day");

  const sunData: SunInfo[] = await fetchSunData(
    coordinates,
    dateStart,
    dateEnd
  );

  // Put a message for "Time to Sleep if it's 00:00"
  const dayLengthTime = calculateTimeDifference(
    moment().tz(sunData[0].timezone),
    sunData[0].sunset
  );

  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="inline-flex items-center w-3/5 h-9 p-2 rounded-lg bg-default-200 text-lg">
        Sunrise / Sunset
      </div>
      <div className="h-72 rounded-lg bg-default-300">
        <div className="grid lg:grid-cols-1">
          <div className="text-center">
            dawn {sunData[0].dawn.format("h:mm A z")}
          </div>
          <div className="text-center">
            sun rise {sunData[0].sunrise.format("h:mm A z")}
          </div>
          <div className="text-center">
            sun peak {sunData[0].solar_noon.format("h:mm A z")}
          </div>
          <div className="text-center">
            sun set {sunData[0].sunset.format("h:mm A z")}
          </div>
          <div className="text-center">
            dusk {sunData[0].dusk.format("h:mm A z")}
          </div>
        </div>
        <div className="text-center mt-8">
          Daylight left:{" "}
          {`${dayLengthTime.hours} hours ${dayLengthTime.minutes} minutes`}
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>

        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </div>
    </Card>
  );
}
