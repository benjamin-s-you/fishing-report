import { filterTodayData } from "@/app/lib/helpers";
import { fetchStationData } from "@/app/lib/tide/api";
import { Station } from "@/app/lib/tide/types";
import { Coordinates } from "@/app/lib/types";
import { fetchWeatherData } from "@/app/lib/weather/api";
import { WeatherForecast } from "@/app/lib/weather/types";
import { Card } from "@nextui-org/react";

export default async function WindWidgetContainer({
  stationId,
}: {
  stationId: string;
}) {
  try {
    const station: Station = await fetchStationData(stationId);
    const coordinates: Coordinates = {
      latitude: station.lat,
      longitude: station.lng,
    };

    const weatherData: WeatherForecast[] = await fetchWeatherData(coordinates);
    const todayWeatherData: WeatherForecast[] = filterTodayData(weatherData);

    return (
      <Card className="space-y-5 p-4" radius="lg">
        <div className="inline-flex items-center w-3/5 h-9 p-2 rounded-lg bg-default-200 text-lg">
          Wind
        </div>
        <div className="h-72 rounded-lg bg-default-300">
          {todayWeatherData.map((period, key) => {
            return (
              <div key={key}>
                {period.startTime.format("h:mm A")} - {period.windSpeed} -{" "}
                {period.windDirection}
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
  } catch (error) {
    return (
      <Card className="space-y-5 p-4" radius="lg">
        {/* Title */}
        <div className="inline-flex items-center w-3/5 h-9 p-2 rounded-lg bg-default-200 text-lg">
          Wind
        </div>
        <div className="h-72 rounded-lg bg-default-300 flex items-center justify-center">
          Data cannot be reached from National Weather Service
        </div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </div>
      </Card>
    );
  }
}
