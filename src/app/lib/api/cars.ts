import { Car, CarsFilters, CarsResponse } from "@/types/car";
import { RentalFormValues } from "@/types/form";
import axios from "axios";

const api = axios.create({ baseURL: "https://car-rental-api.goit.study" });

export async function fetchCars(page: number, filters: CarsFilters) {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: { page, perPage: 12, ...filters },
  });
  return data;
}

export async function fetchCarById(carId: string) {
  const { data } = await api.get<Car>(`/cars/${carId}`);
  return data;
}

interface FiltersProps {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export async function getFilters(): Promise<FiltersProps> {
  const { data } = await api.get<FiltersProps>("/cars/filters");
  return data;
}

export async function bookCar(carId: string, values: RentalFormValues) {
  const { data } = await api.post(`/cars/${carId}/booking-requests`, values);
  return data;
}
