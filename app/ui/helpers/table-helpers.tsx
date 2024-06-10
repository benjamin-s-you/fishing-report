// helpers.ts
import { Station } from "@/app/lib/tide/types";

export const filterStations = (
  stations: Station[],
  query: string
): Station[] => {
  return stations.filter((station) =>
    Object.values(station).some((val) =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  );
};

export const stationColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "STATION NAME" },
  { key: "lat", label: "LATITUDE" },
  { key: "lng", label: "LONGITUDE" },
  { key: "state", label: "STATE" },
];
