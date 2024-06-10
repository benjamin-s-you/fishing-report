import moment from "moment";
import { WeatherForecastResponse, WeatherForecast } from "./types";

export function mapWeatherPeriods(
  periods: WeatherForecastResponse[],
  timeZone: string
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
    }) => {
      return {
        number,
        name,
        date: moment(startTime).tz(timeZone).startOf("day"),
        startTime: moment(startTime).tz(timeZone),
        endTime: moment(endTime).tz(timeZone),
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
      };
    }
  );
}
