"use client";

import { useState } from "react";
import css from "./Catalog.module.css";
import { CarsFilters } from "@/types/car";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "../lib/api/cars";
import CarCard from "@/components/CarCard/CarCard";
import Loader from "@/components/Loader/Loader";

function Catalog() {
  const [filters, setFilters] = useState<CarsFilters>({});
  const [pendingFilters, setPendingFilters] = useState<CarsFilters>({});

  const handleSearch = () => setFilters(pendingFilters);
  const handleClear = () => {
    setPendingFilters({});
    setFilters({});
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) => fetchCars(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? []; // групування вiдповiдей

  return (
    <>
      <ul className={css.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {isLoading && <Loader />}
      {isError && <p>Something went wrong</p>}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}

export default Catalog;
