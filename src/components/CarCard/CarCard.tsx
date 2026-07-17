import Image from "next/image";
import css from "./CarCard.module.css";

import { Car } from "@/types/car";
import Link from "next/link";

function CarCard({ car }: { car: Car }) {
  return (
    <li className={css.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={244}
        height={268}
      />
      <div className={css.header}>
        <p>
          {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
          {car.year}
        </p>
        <p>{car.rentalPrice}</p>
      </div>
      <p>
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
      <Link href={`/catalog/${car.id}`} target="_blank">
        Read more
      </Link>
    </li>
  );
}

export default CarCard;
