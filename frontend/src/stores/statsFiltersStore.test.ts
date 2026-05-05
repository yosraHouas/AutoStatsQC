import { describe, expect, it } from "vitest";
import { useStatsFiltersStore } from "./statsFiltersStore";

describe("statsFiltersStore", () => {
  it("reset la page à 1 quand le type de véhicule change", () => {
    useStatsFiltersStore.getState().setPage(3);

    useStatsFiltersStore.getState().setVehicleType("Passenger cars");

    expect(useStatsFiltersStore.getState().page).toBe(1);
    expect(useStatsFiltersStore.getState().vehicleType).toBe("Passenger cars");
  });
});