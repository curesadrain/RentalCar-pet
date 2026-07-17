import Image from "next/image";

import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
