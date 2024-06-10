import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { Coordinates } from "@/app/lib/types";
import { WeatherForecast } from "@/app/lib/weather/types";
import { mapWeatherPeriods } from "@/app/lib/weather/helpers";
import Utils from "@/utils/utils";

async function fetchForecastHourly(url: string) {
  noStore();

  const response = await axios.get(url);
  return response.data;
}

export async function fetchWeatherData(
  coordinates: Coordinates
): Promise<WeatherForecast[]> {
  noStore();

  try {
    const url: string = Utils.getWeatherUrl(
      coordinates.latitude,
      coordinates.longitude
    );
    const response: any = await axios.get(url);

    const forecastHourlyUrl: string = response.data.properties.forecastHourly;
    const forecastHourly: any = await fetchForecastHourly(forecastHourlyUrl);

    const forecastPeriods: WeatherForecast[] = mapWeatherPeriods(
      forecastHourly.properties.periods
    );

    return forecastPeriods;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}
