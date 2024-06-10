import moment from "moment";
import { WeatherForecastResponse, WeatherForecast } from "./types";

export function mapWeatherPeriods(
  periods: WeatherForecastResponse[]
): WeatherForecast[] {
  return periods.map(
    ({
      number,
      name,
      startTime,
      endTime,
      isDaytime,
      temperature,
      temperatureUnit,
      temperatureTrend,
      probabilityOfPrecipitation,
      dewpoint,
      relativeHumidity,
      windSpeed,
      windDirection,
      icon,
      shortForecast,
      detailedForecast,
    }) => ({
      number,
      name,
      date: moment(startTime).startOf("day"),
      startTime: moment(startTime),
      endTime: moment(endTime),
      isDaytime,
      temperature,
      temperatureUnit,
      temperatureTrend,
      probabilityOfPrecipitation: {
        unitCode: probabilityOfPrecipitation.unitCode,
        value: probabilityOfPrecipitation.value,
      },
      dewpoint: {
        unitCode: dewpoint.unitCode,
        value: dewpoint.value,
      },
      relativeHumidity: {
        unitCode: relativeHumidity.unitCode,
        value: relativeHumidity.value,
      },
      windSpeed,
      windDirection,
      icon,
      shortForecast,
      detailedForecast,
    })
  );
}
