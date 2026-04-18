"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";

import css from "./TravelTruckDetails.client.module.css";

import { getTraveltruckById } from "@/lib/api/clientApi";
import { TravelTruck } from "@/types/travelTruck";
import BookingTravelTruckForm from "@/components/BookingTravelTruckForm/BookingTravelTruckForm";
import TravelTruckFeaturesSection from "@/components/TravelTruckFeaturesSection/TravelTruckFeaturesSection";
import TravelTruckReviewsSection from "@/components/TravelTruckReviewsSection/TravelTruckReviewsSection";

interface TravelTruckDetailsProps {
  id: string;
}

export default function TravelTruckDetails({ id }: TravelTruckDetailsProps) {
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

  console.log(travelTruck);

  return (
    <>
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
          <p className={css.price}>€ {travelTruck.price.toFixed(2)}</p>
          <div className={css.photoContainer}>
            {travelTruck.gallery.map((item) => (
              <div key={travelTruck.id} className={css.imageConatiner}>
                <Image
                  className={css.image}
                  src={item.thumb}
                  alt={travelTruck.name}
                  fill
                  unoptimized
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
          <p className={css.description}>{travelTruck.description}</p>
          <div className={css.sectionTitles}>
            <p>Features</p>
            <p>Reviews</p>
          </div>
          <div className={css.sectionsContainer}>
            <TravelTruckFeaturesSection travelTruck={travelTruck} />
            <BookingTravelTruckForm id={id} />
          </div>
        </div>
      )}
    </>
  );
}
