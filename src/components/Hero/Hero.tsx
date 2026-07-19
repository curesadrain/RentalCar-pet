import css from "./Hero.module.css";

import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className={css.hero}>
      <Image
        src="/images/hero-car.jpg"
        alt="Hero car image"
        fill
        priority
        className={css.heroImage}
      />
      <div className={css.overlay} />
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}

export default Hero;
