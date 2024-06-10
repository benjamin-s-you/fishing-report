import moment, { Moment } from "moment-timezone";

function convertTimetoMoment(
  date: string,
  time: string,
  timeZone: string
): Moment {
  const dateAndTime = new Date(`${date} ${time}`);
  return moment(dateAndTime).tz(timeZone);
}

export function mapSunData(data: any) {
  return {
    date: moment(data.date),
    sunrise: convertTimetoMoment(data.date, data.sunrise, data.timezone),
    sunset: convertTimetoMoment(data.date, data.sunset, data.timezone),
    first_light: convertTimetoMoment(
      data.date,
      data.first_light,
      data.timezone
    ),
    last_light: convertTimetoMoment(data.date, data.last_light, data.timezone),
    dawn: convertTimetoMoment(data.date, data.dawn, data.timezone),
    dusk: convertTimetoMoment(data.date, data.dusk, data.timezone),
    solar_noon: convertTimetoMoment(data.date, data.solar_noon, data.timezone),
    golden_hour: convertTimetoMoment(
      data.date,
      data.golden_hour,
      data.timezone
    ),
    day_length: data.day_length,
    timezone: data.timezone,
    utc_offset: data.utc_offset,
  };
}
