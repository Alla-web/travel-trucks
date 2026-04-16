import Image from "next/image";

import css from "./page.module.css";

import HeroSection from "../components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <HeroSection />
      </main>
    </div>
  );
}
