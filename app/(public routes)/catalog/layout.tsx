import css from "./layout.module.css";

interface TravelTrucksLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function TravelTrucksLayout({
  children,
  sidebar,
}: TravelTrucksLayoutProps) {
  return (
    <section className={`${css.sectionContainer} container`}>
      <aside className={css.sidebarContainer}>{sidebar}</aside>
      <div className={css.travelTrucksContainer}>{children}</div>
    </section>
  );
}
