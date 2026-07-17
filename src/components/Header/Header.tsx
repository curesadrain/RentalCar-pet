import css from "./Header.module.css";

import Link from "next/link";

function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        RentalCar
      </Link>
      <nav aria-label="Main Navigation">
        <ul aria-label="Main Navigation">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
