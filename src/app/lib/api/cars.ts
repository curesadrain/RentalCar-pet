import { CarsFilters, CarsResponse } from "@/types/car";
import axios from "axios";

const api = axios.create({ baseURL: "https://car-rental-api.goit.study" });

export async function fetchCars(page: number, filters: CarsFilters) {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: { page, perPage: 12, ...filters },
  });
  return data;
}
