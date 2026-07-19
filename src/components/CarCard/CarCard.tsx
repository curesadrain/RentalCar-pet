import Image from "next/image";
import css from "./CarCard.module.css";

import { Car } from "@/types/car";
import Link from "next/link";

function CarCard({ car }: { car: Car }) {
  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          className={css.image}
          alt={`${car.brand} ${car.model}`}
          fill
        />
      </div>
      <div className={css.header}>
        <p className={css.title}>
          {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
          {car.year}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <p className={css.meta}>
        {car.location.city}
        <span className={css.stick}> | </span>
        {car.location.country}
        <span className={css.stick}> | </span>
        {car.rentalCompany}
        <span className={css.stick}> | </span>
        {car.type}
        <span className={css.stick}> | </span>
        {car.mileage} km
      </p>
      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        className={css.readMoreButton}
      >
        Read more
      </Link>
    </li>
  );
}

export default CarCard;
