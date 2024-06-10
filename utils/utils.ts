import { Moment } from "moment";

export default class Utils {
  static getWeatherUrl(latitude: number, longitude: number) {
    const baseUrl = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;
    return `${baseUrl}/points/${latitude},${longitude}`;
  }

  static getSunRiseUrl(latitude: number, longitude: number) {
    const baseUrl = process.env.NEXT_PUBLIC_SUNRISE_API_BASE_URL;
    return `${baseUrl}/json?lat=${latitude}&lng=${longitude}`;
  }

  static getTidePredictionsUrl(
    beginDate: Moment,
    stationId: number,
    timeZone: string,
    unit: string
  ) {
    const baseUrl = process.env.NEXT_PUBLIC_TIDE_API_BASE_URL;
    const beginDateFormatted = beginDate.format("YYYYMMDD");
    return `${baseUrl}/api/prod/datagetter?product=predictions&begin_date=${beginDateFormatted}&range=72&datum=MLLW&station=${stationId}&time_zone=${timeZone}&units=${unit}&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred`;
  }

  static getStationUrl(stationId: number) {
    const baseUrl = process.env.NEXT_PUBLIC_TIDE_API_BASE_URL;
    return `${baseUrl}/mdapi/prod/webapi/stations/${stationId}.json?expand=products,tidepredoffsets`;
  }

  static getAllStationsUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_TIDE_API_BASE_URL;
    return `${baseUrl}/mdapi/prod/webapi/stations.json?type=tidepredictions`;
  }
}
