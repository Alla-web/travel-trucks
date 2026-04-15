"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerInnerContainer}>
          <Link href="/">
            <svg className={css.logoIcon}>
              <use href="iconsprite.svg#icon-logo" />
            </svg>
          </Link>
          <nav>
            <ul className={css.headerNav}>
              <li>
                <Link className={pathname === "/" ? css.isActive : ""} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={
                    pathname.startsWith("/catalog") ? css.isActive : ""
                  }
                  href="/catalog"
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
