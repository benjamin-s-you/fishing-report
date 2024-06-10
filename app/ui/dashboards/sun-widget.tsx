import { fetchSunData } from "@/app/lib/sun/api";
import { SunInfo } from "@/app/lib/sun/types";
import { Coordinates } from "@/app/lib/types";
import { Card } from "@nextui-org/react";
import moment, { Moment } from "moment";

export async function SunWidget() {
  function calculateAvailableDayLength(sunData: SunInfo) {
    const now = moment().tz(sunData.timezone);
    // console.log(now);
    // console.log(sunData.sunset);
    if (
      now.isAfter(sunData.sunset) &&
      now.format("YYYYMMDD") !== sunData.sunset.format("YYYYMMDD")
    ) {
      return {
        hours: 0,
        minutes: 0,
      };
    } else {
      const diffMilliseconds = sunData.sunset.diff(
        moment().tz(sunData.timezone)
      );
      const duration = moment.duration(diffMilliseconds);
      return {
        hours: duration.hours(),
        minutes: duration.minutes(),
      };
    }
  }
  const coordinates: Coordinates = {
    latitude: 40.5867,
    longitude: -73.5783,
  };

  const sunData = await fetchSunData(coordinates);

  // Put a message for "Time to Sleep if it's 00:00"
  const dayLengthTime = calculateAvailableDayLength(sunData);

  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="h-9 w-3/5 rounded-lg bg-default-200">
        Sunrise / Sunset
      </div>
      <div className="h-72 rounded-lg bg-default-300">
        <div className="grid lg:grid-cols-3">
          <div className="text-center">
            sun rise {sunData.sunrise.format("h:mm A")}
          </div>
          <div className="text-center">
            sun peak {sunData.solar_noon.format("h:mm A")}
          </div>
          <div className="text-center">
            sun set {sunData.sunset.format("h:mm A")}
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
