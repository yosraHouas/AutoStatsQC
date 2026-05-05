import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export type VehicleStat = {
  id: number;
  year: number;
  province: { name: string };
  vehicleType: string;
  fuelType: string;
  value: number;
  importedAt: string;
};

export type StatsResponse = {
  total: number;
  page: number;
  pageSize: number;
  data: VehicleStat[];
};

export type ChartItem = {
  fuelType: string;
  total: number;
};

export async function importData() {
  const response = await axios.get<string>(`${API_BASE_URL}/import`);
  return response.data;
}
export async function getStats(params: {
  year?: number;
  vehicleType?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await axios.get<StatsResponse>(`${API_BASE_URL}/stats`, {
    params,
  });

  return response.data;
}

export async function getVehicleTypes() {
  const response = await axios.get<string[]>(`${API_BASE_URL}/vehicle-types`);
  return response.data;
}



export async function getChartData(params: {
  year?: number;
  vehicleType?: string;
}) {
  const response = await axios.get<ChartItem[]>(
    `${API_BASE_URL}/stats/chart`,
    { params }
  );

  return response.data;
}