"use client";

import { usePathname } from "next/navigation";

import css from "./layout.module.css";

interface TravelTrucksLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function TravelTrucksLayout({
  children,
  sidebar,
}: TravelTrucksLayoutProps) {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/catalog";
  return (
    <section className={`${css.sectionContainer} container`}>
      {/* Рендерим aside только если мы на странице списка */}
      {isCatalogPage && sidebar && (
        <aside className={css.sidebarContainer}>{sidebar}</aside>
      )}

      <div className={css.travelTrucksContainer}>{children}</div>
    </section>
  );
}
