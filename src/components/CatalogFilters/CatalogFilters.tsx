import { CarsFilters } from "@/types/car";
import css from "./CatalogFilters.module.css";

interface Props {
  pendingFilters: CarsFilters;
  brands: string[];
  priceOptions: number[];
  onChange: (filters: CarsFilters) => void;
  onSearch: () => void;
  onClear: () => void;
}

function CatalogFilters({
  pendingFilters,
  brands,
  priceOptions,
  onChange,
  onSearch,
  onClear,
}: Props) {
  return (
    <div className={css.filters}>
      <div className={css.field}>
        <label htmlFor="brand-select" className={css.label}>
          Car Brand
        </label>
        <select
          id="brand-select"
          value={pendingFilters.brand ?? ""}
          onChange={(e) =>
            onChange({ ...pendingFilters, brand: e.target.value || undefined })
          }
        >
          <option value="" disabled hidden>
            Choose a brand
          </option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className={css.field}>
        <label htmlFor="price-select" className={css.label}>
          Price/ 1hour
        </label>
        <select
          id="price-select"
          value={pendingFilters.price ?? ""}
          onChange={(e) =>
            onChange({ ...pendingFilters, price: e.target.value || undefined })
          }
        >
          <option value="" disabled hidden>
            Choose a price
          </option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
      <div className={css.mileage}>
        <label id="mileage-label">Car mileage / km</label>

        <div
          className={css.mileage}
          role="group"
          aria-labelledby="mileage-label"
        >
          <input
            type="number"
            min={0}
            aria-label="From"
            placeholder="From"
            value={pendingFilters.minMileage ?? ""}
            onChange={(e) =>
              onChange({ ...pendingFilters, minMileage: e.target.value })
            }
          />
          <input
            type="number"
            min={0}
            aria-label="To"
            placeholder="To"
            value={pendingFilters.maxMileage ?? ""}
            onChange={(e) =>
              onChange({ ...pendingFilters, maxMileage: e.target.value })
            }
          />
        </div>
      </div>
      <button className={css.button} onClick={onSearch}>
        Search
      </button>
      <button className={css.clear} onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}

export default CatalogFilters;
