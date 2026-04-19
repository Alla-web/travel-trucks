"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import css from "./GallerySwiper.module.css";

interface GallerySwiperProps {
  images: string[];
}

export default function GallerySwiper({ images }: GallerySwiperProps) {
  const [thumbsSwiper, sethumbsSwiper] = useState<any>(null);

  return (
    <div className={css.galleryWrapper}>
      <Swiper
        slidesPerView={3} // Показуємо 3 фото одночасно
        spaceBetween={48} // Відступ між фото як у ТЗ
        modules={[Navigation]} // Можна залишити тільки навігацію, якщо вона треба
        className={css.mySwiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={css.slideContent}>
              <Image
                src={img}
                alt="Camper photo"
                fill
                unoptimized
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className={css.image}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
