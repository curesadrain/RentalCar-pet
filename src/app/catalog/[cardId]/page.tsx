import { fetchCarById } from "@/app/lib/api/cars";
import { notFound } from "next/navigation";
import Image from "next/image";

import {
  LuCircleCheck,
  LuCalendarCog,
  LuCar,
  LuFuel,
  LuCog,
  LuRailSymbol,
} from "react-icons/lu";

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
    <section className={css.information} aria-label="Car Info">
      <div className={css.imageWrapper}>
        <Image src={car.img} alt={`${car.brand} ${car.model}`} fill />
      </div>
      <div className={css.infobox}>
        <h1 className={css.header}>
          {car.brand} {car.model}, {car.year}
        </h1>
        <p className={css.location}>
          {car.location.country}, {car.location.city}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
        <div className={css.section}>
          <h2 className={css.subtitle}>Rental Conditions:</h2>
          <ul className={css.list}>
            {car.rentalConditions.map((condition) => (
              <li key={condition} className={css.condition}>
                <LuCircleCheck className={css.checkIcon} />
                {condition}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.section}>
          <h2 className={css.subtitle}>Car Specifications:</h2>
          <ul className={css.list}>
            <li className={css.condition}>
              <LuCalendarCog />
              Year:{car.year}
            </li>
            <li className={css.condition}>
              <LuCar />
              Type: {car.type}
            </li>
            <li className={css.condition}>
              <LuFuel />
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={css.condition}>
              <LuCog />
              Engine: {car.engine}
            </li>
            <li className={css.condition}>
              <LuRailSymbol />
              Mileage: {car.mileage}
            </li>
          </ul>
        </div>
        <div className={css.section}>
          <h2 className={css.subtitle}>Features:</h2>
          <ul className={css.list}>
            {car.features.map((feature) => (
              <li key={feature} className={css.condition}>
                <LuCircleCheck className={css.checkIcon} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.formWrapper}>
        <RentalForm carId={car.id} />
      </div>
    </section>
  );
}

export default CarInfoPage;
