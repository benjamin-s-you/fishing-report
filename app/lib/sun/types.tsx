import { Moment } from "moment";

export interface SunInfo {
  date: Moment;
  sunrise: Moment;
  sunset: Moment;
  first_light: Moment;
  last_light: Moment;
  dawn: Moment;
  dusk: Moment;
  solar_noon: Moment;
  golden_hour: Moment;
  day_length: string;
  timezone: string;
  utc_offset: number;
}
