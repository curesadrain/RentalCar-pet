"use client";

import { useState } from "react";
import css from "./Catalog.module.css";
import { CarsFilters } from "@/types/car";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { fetchCars, getFilters } from "../lib/api/cars";
import CarCard from "@/components/CarCard/CarCard";
import Loader from "@/components/Loader/Loader";
import CatalogFilters from "@/components/CatalogFilters/CatalogFilters";
import Image from "next/image";

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
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) => fetchCars(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? []; // групування вiдповiдей

  const isRefetching = isFetching && !isFetchingNextPage;

  return (
    <section aria-label="Car Catalog" className={css.catalog}>
      <CatalogFilters
        pendingFilters={pendingFilters}
        brands={brands}
        priceOptions={priceOptions}
        onChange={setPendingFilters}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      {/* <ul className={css.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul> */}

      {isLoading && <Loader />}

      {!isLoading && (
        <div className={css.gridWrapper}>
          <ul className={`${css.grid} ${isRefetching ? css.gridBlurred : ""}`}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </ul>
          {isRefetching && <Loader />}
        </div>
      )}

      {!isLoading && cars.length === 0 && !isError && (
        <div className={css.emptySearch}>
          <div className={css.imageWrapper}>
            <Image
              src="/images/no-match.png"
              className={css.emptyImage}
              alt="No cars found"
              fill
            />
          </div>
          <h2 className={css.emptyHeader}>No cars found</h2>
          <p className={css.emptyInfo}>
            We couldn`t find any cars that match your current filters. Try
            changing your search criteria or reset the filters.
          </p>
          <button
            className={css.emptyButton}
            type="button"
            onClick={handleClear}
          >
            Reset Filters
          </button>
        </div>
      )}
      {isError && <p className={css.emptyState}>Something went wrong</p>}

      {hasNextPage && (
        <button
          className={css.loadMoreButton}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}

export default Catalog;
