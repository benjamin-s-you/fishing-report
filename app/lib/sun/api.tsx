import "server-only";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { Coordinates } from "@/app/lib/types";
import { SunInfo } from "@/app/lib/sun/types";
import Utils from "@/utils/utils";
import { mapSunData } from "@/app/lib/sun/helpers";
import { Moment } from "moment";

export async function fetchSunData(
  coordinates: Coordinates,
  dateStart?: Moment,
  dateEnd?: Moment
): Promise<SunInfo[]> {
  try {
    const url = Utils.getSunRiseUrl(
      coordinates.latitude,
      coordinates.longitude,
      dateStart,
      dateEnd
    );

    const response: any = await fetch(url);
    const data: any = await response.json();

    const sunInfo: SunInfo[] = data.results.map((si: any) => {
      return mapSunData(si);
    });
    return sunInfo;
  } catch (error) {
    console.error("Error fetching sun data:", error);
    throw new Error("Failed to fetch sun data");
  }
}
