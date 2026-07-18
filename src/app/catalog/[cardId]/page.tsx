import { fetchCarById } from "@/app/lib/api/cars";
import { notFound } from "next/navigation";
import Image from "next/image";

import css from "./CarInfo.module.css";
import RentalForm from "@/components/RentalForm/RentalForm";

interface PageProps {
  params: Promise<{ cardId: string }>;
}

async function CarInfoPage({ params }: PageProps) {
  const { cardId } = await params;

  let car;
  try {
    car = await fetchCarById(cardId);
  } catch {
    notFound();
  }

  return (
    <section className={css.wrapper} aria-label="Car Info">
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={640}
        height={512}
      />
      <div className={css.infobox}>
        <h1 className={css.header}>
          {car.brand} {car.model}, {car.year}
        </h1>
        <p className={css.location}>
          {car.location.country}, {car.location.city}
        </p>
        <p className={css.price}>{car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
        <div className={css.section}>
          <h2 className="sub-title">Rental Conditions:</h2>
          <ul className={css.list}>
            {car.rentalConditions.map((condition) => (
              <li key={condition} className={css.condition}>
                {condition}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.section}>
          <h2 className={css.subtitle}>Car Specifications:</h2>
          <ul className={css.list}>
            <li className={css.condition}>Year:{car.year}</li>
            <li className={css.condition}>Type: {car.type}</li>
            <li className={css.condition}>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={css.condition}>Engine: {car.engine}</li>
            <li className={css.condition}>Mileage: {car.mileage}</li>
          </ul>
        </div>
        <div className={css.section}>
          <h2 className={css.subtitle}>Features:</h2>
          <ul className={css.list}>
            {car.features.map((feature) => (
              <li key={feature} className={css.condition}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <RentalForm carId={car.id} />
    </section>
  );
}

export default CarInfoPage;
