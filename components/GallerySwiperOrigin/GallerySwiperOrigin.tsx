"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import css from "./GallerySwiperOrigin.module.css";

interface GallerySwiperProps {
  images: string[];
}

export default function GallerySwiperOrigin({ images }: GallerySwiperProps) {
  const [thumbsSwiper, sethumbsSwiper] = useState<any>(null);

  return (
    <div className={css.galleryWrapper}>
      {/* Головний слайдер */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.mainSwiper}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={css.mainImageContainer}>
              <Image
                src={item}
                alt="TravelTruck photo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={css.image}
                unoptimized
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Слайдер з мініатюрами */}
      <Swiper
        onSwiper={sethumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.thumbsSwiper}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className={css.thumbSlide}>
            <div className={css.thumbImageContainer}>
              <Image
                src={item}
                alt="TravelTruck photo"
                fill
                className={css.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
