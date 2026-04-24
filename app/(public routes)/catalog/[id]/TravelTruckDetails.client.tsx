"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import css from "./TravelTruckDetails.client.module.css";

import { getTraveltruckById } from "@/lib/api/clientApi";
import { TravelTruck } from "@/types/travelTruck";
import BookingTravelTruckForm from "@/components/BookingTravelTruckForm/BookingTravelTruckForm";
import TravelTruckFeaturesSection from "@/components/TravelTruckFeaturesSection/TravelTruckFeaturesSection";
import TravelTruckReviewsSection from "@/components/TravelTruckReviewsSection/TravelTruckReviewsSection";
import Loader from "@/components/Loader/Loader";
import GallerySwiperOrigin from "@/components/GallerySwiperOrigin/GallerySwiperOrigin";
import GallerySwiper from "@/components/GallerySwiper/GallerySwiper";

interface TravelTruckDetailsProps {
  id: string;
}

export default function TravelTruckDetails({ id }: TravelTruckDetailsProps) {
  const [isActiveTab, setIsActiveTab] = useState("features");

  const {
    data: travelTruck,
    isLoading,
    error,
  } = useQuery<TravelTruck>({
    queryKey: ["camper", id],
    queryFn: () => getTraveltruckById(id),
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000,
  });

  const galleryOroginal = travelTruck?.gallery.map((item) => item.original);

  return (
    <>
      {isLoading && <Loader />}

      {travelTruck && (
        <div className={css.pageContainer}>
          <h2 className={css.travelTruckName}>{travelTruck?.name}</h2>
          <div className={css.reviewLocationContainer}>
            <div className={css.reviewContainer}>
              <svg className={css.starIcon}>
                <use href="/iconsprite.svg#rating-yellow" />
              </svg>
              <p className={css.reviewText}>
                {travelTruck.rating} ({travelTruck.reviews.length} Reviews)
              </p>
            </div>
            <div className={css.locationContainer}>
              <svg className={css.locationIcon}>
                <use href="/iconsprite.svg#map-black" />
              </svg>
              <p className={css.locationText}>{travelTruck.location}</p>
            </div>
          </div>
          <p className={css.price}>€{travelTruck.price.toFixed(2)}</p>
          <div className={css.photoContainer}>
            {galleryOroginal && (
              <GallerySwiperOrigin images={galleryOroginal} />
            )}

            {/* {galleryOroginal && <GallerySwiper images={galleryOroginal} />} */}
          </div>
          <p className={css.description}>{travelTruck.description}</p>
          <div className={css.sectionTitles}>
            <button
              onClick={() => setIsActiveTab("features")}
              className={`${css.featureReviewsToggleBtns} ${isActiveTab === "features" ? css.activeTab : ""}`}
            >
              Features
            </button>
            <button
              onClick={() => setIsActiveTab("reviews")}
              className={`${css.featureReviewsToggleBtns} ${isActiveTab === "reviews" ? css.activeTab : ""}`}
            >
              Reviews
            </button>
          </div>
          <div className={css.sectionsContainer}>
            {isActiveTab === "features" ? (
              <TravelTruckFeaturesSection travelTruck={travelTruck} />
            ) : (
              <TravelTruckReviewsSection travelTruck={travelTruck} />
            )}
            {<BookingTravelTruckForm id={id} />}
          </div>
        </div>
      )}
    </>
  );
}
