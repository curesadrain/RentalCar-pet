"use client";

import css from "./Header.module.css";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
];

function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <Image
          src="/images/logo.png"
          alt="RentalCar logo"
          width={102}
          height={16}
          priority
        />
      </Link>

      <nav aria-label="Main Navigation" className={css.nav}>
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`${css.navLink} ${isActive ? css.navLinkActive : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
