"use client";

import Image from "next/image";
import Link from "next/link";

import css from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={css.sectionContainer}>
      <div className="container">
        <section className={css.heroSectionInner}>
          <Image
            src="/hero/hero-image-2x.webp"
            alt="Hero Background"
            fill
            unoptimized
            priority
            className={css.bgImage}
            style={{ objectFit: "cover", objectPosition: "center", zIndex: -1 }}
          />
          <h1 className={css.mainTitle}>Campers of your dreams</h1>
          <h2 className={css.subTitile}>
            You can find everything you want in our catalog
          </h2>
          <Link href="/catalog" className={css.viewNowBtn}>
            View Now
          </Link>
        </section>
      </div>
    </div>
  );
}
