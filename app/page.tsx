import { Metadata } from "next";

import css from "./page.module.css";

import HeroSection from "../components/HeroSection/HeroSection";

export const metadata: Metadata = {
  title: "Оренда кемперів | Travel Trucks",
  description:
    "Знайди ідеальний кемпер для подорожі по Європі. Зручний каталог, швидке бронювання.",
  openGraph: {
    title: "Оренда кемперів | Travel Trucks",
    description:
      "Подорожуй комфортно з нашими travel trucks. Обери кемпер онлайн.",
    url: "https://travel-trucks-tau-weld.vercel.app/",
    images: [
      {
        url: "https://travel-trucks-tau-weld.vercel.app/hero/hero-image-2x.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <HeroSection />
      </main>
    </div>
  );
}
