import { create } from "zustand";

type FiltersState = {
  year: number;
  vehicleType: string;
  page: number;
  pageSize: number;
  setYear: (year: number) => void;
  setVehicleType: (vehicleType: string) => void;
  setPage: (page: number) => void;
};

export const useStatsFiltersStore = create<FiltersState>((set) => ({
  year: 2020,
  vehicleType: "Passenger cars",
  page: 1,
  pageSize: 10,
  setYear: (year) => set({ year, page: 1 }),
  setVehicleType: (vehicleType) => set({ vehicleType, page: 1 }),
  setPage: (page) => set({ page }),
}));