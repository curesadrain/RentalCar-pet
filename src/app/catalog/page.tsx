"use client";

import { useState } from "react";
import css from "./Catalog.module.css";
import { CarsFilters } from "@/types/car";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchCars, getFilters } from "../lib/api/cars";
import CarCard from "@/components/CarCard/CarCard";
import Loader from "@/components/Loader/Loader";
import CatalogFilters from "@/components/CatalogFilters/CatalogFilters";

function Catalog() {
  const [filters, setFilters] = useState<CarsFilters>({});
  const [pendingFilters, setPendingFilters] = useState<CarsFilters>({});

  const handleSearch = () => setFilters(pendingFilters);
  const handleClear = () => {
    setPendingFilters({});
    setFilters({});
  };

  function generatePriceOptions(min: number, max: number, step = 10): number[] {
    const options: number[] = [];
    for (let price = min; price <= max; price += step) {
      options.push(price);
    }
    return options;
  }

  const { data: filtersData } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
    staleTime: Infinity,
  });

  const brands = filtersData?.brands ?? [];
  const priceOptions = filtersData
    ? generatePriceOptions(filtersData.price.min, filtersData.price.max)
    : [];

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
    <section aria-label="Car Catalog">
      <CatalogFilters
        pendingFilters={pendingFilters}
        brands={brands}
        priceOptions={priceOptions}
        onChange={setPendingFilters}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <ul className={css.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {isLoading && <Loader />}
      {!isLoading && cars.length === 0 && !isError && (
        <p>No cars found matching your criteria</p>
      )}
      {isError && <p>Something went wrong</p>}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}

export default Catalog;
