import Link from "next/link";
import Image from "next/image";
import css from "./NotFound.module.css"; // тот же модуль, если стили emptySearch там же

export default function NotFound() {
  return (
    <div className={css.emptySearch}>
      <div className={css.imageWrapper}>
        <Image
          src="/images/no-match.png"
          className={css.emptyImage}
          alt="Car not found"
          fill
        />
      </div>
      <h2 className={css.emptyHeader}>Car not found</h2>
      <p className={css.emptyInfo}>
        We couldn`t find the car you`re looking for. It may have been removed or
        the link is incorrect.
      </p>
      <Link href="/catalog" className={css.emptyButton}>
        Back to Catalog
      </Link>
    </div>
  );
}
