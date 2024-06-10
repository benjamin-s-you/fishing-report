import { create } from "zustand";
import { Station, TidePrediction, TidePredictions } from "@/app/lib/tide/types";
import { fetchAllStations, fetchTideData } from "@/app/lib/tide/api";
import moment, { Moment } from "moment";

interface GlobalState {
  now: Moment;
  stations: Station[];
  selectedStationId: number;
  tidePredictions: TidePredictions;
  updateSelectedStation: (selectedStationId: string) => void;
  fetchAllStations: () => void;
  fetchTideData: () => void;
}

export const globalStore = create<GlobalState>()((set, get) => ({
  now: moment(),
  stations: [],
  selectedStationId: 0,
  tidePredictions: { predictions: [] },
  updateSelectedStation: (selectedStationId: string) => {
    set((state: any) => ({
      ...state,
      selectedStationId: Number(selectedStationId),
    }));
  },
  fetchAllStations: async () => {
    const stations: Station[] = await fetchAllStations();
    set((state: any) => ({
      ...state,
      stations: stations,
    }));
  },
  fetchTideData: async () => {
    const yesterdayDate = get().now.subtract(1, "days").startOf("day");
    const tidePredictions: TidePredictions = await fetchTideData(
      get().selectedStationId,
      yesterdayDate
    );
    set((state: any) => ({
      ...state,
      tidePredictions: tidePredictions,
    }));
  },
}));
