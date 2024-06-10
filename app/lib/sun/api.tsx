import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { Coordinates } from "@/app/lib/types";
import { SunInfo } from "@/app/lib/sun/types";
import Utils from "@/utils/utils";
import { mapSunData } from "@/app/lib/sun/helpers";

export async function fetchSunData(coordinates: Coordinates) {
  try {
    noStore();
    const url = Utils.getSunRiseUrl(
      coordinates.latitude,
      coordinates.longitude
    );

    const response: any = await axios.get(url);
    const data: any = response.data;

    const sunInfo: SunInfo = mapSunData(data.results);
    return sunInfo;
  } catch (error) {
    console.error("Error fetching sun data:", error);
    throw new Error("Failed to fetch sun data");
  }
}
