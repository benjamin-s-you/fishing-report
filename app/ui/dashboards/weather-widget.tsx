import { filterTodayData } from "@/app/lib/helpers";
import { Coordinates } from "@/app/lib/types";
import { fetchWeatherData } from "@/app/lib/weather/api";
import { WeatherForecast } from "@/app/lib/weather/types";
import { Card } from "@nextui-org/react";

export async function WeatherWidget() {
  const coordinates: Coordinates = {
    latitude: 40.5867,
    longitude: -73.5783,
  };

  const weatherData: WeatherForecast[] = await fetchWeatherData(coordinates);
  const todayWeatherData: WeatherForecast[] = filterTodayData(weatherData);

  return (
    <Card className="space-y-5 p-4" radius="lg">
      {/* Title */}
      <div className="inline-flex items-center w-3/5 h-9 p-2 rounded-lg bg-default-200 text-lg">
        Weather
      </div>
      <div className="h-72 rounded-lg bg-default-300">
        {todayWeatherData.map((period, key) => {
          return (
            <div key={key}>
              {period.startTime.format("h:mm A")} - {period.temperature}
              {period.temperatureUnit} - {period.shortForecast} -{" "}
              {period.probabilityOfPrecipitation.value}%
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
