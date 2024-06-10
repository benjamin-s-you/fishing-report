import axios from "axios";
import { Coordinates } from "@/app/lib/types";
import { WeatherForecast } from "@/app/lib/weather/types";
import { mapWeatherPeriods } from "@/app/lib/weather/helpers";
import Utils from "@/utils/utils";

async function fetchForecastHourly(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch hourly forecast");
  }
  return await response.json();
}

export async function fetchWeatherData(
  coordinates: Coordinates
): Promise<WeatherForecast[]> {
  try {
    const url = Utils.getWeatherUrl(
      coordinates.latitude,
      coordinates.longitude
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();

    if (!data?.properties?.forecastHourly) {
      throw new Error("Invalid weather data response");
    }

    const forecastHourlyUrl = data.properties.forecastHourly;
    const timeZone = data.properties.timeZone;
    const forecastHourly = await fetchForecastHourly(forecastHourlyUrl);

    if (!forecastHourly?.properties?.periods) {
      throw new Error("Invalid hourly forecast data");
    }

    return mapWeatherPeriods(forecastHourly.properties.periods, timeZone);
  } catch (error: unknown) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}
