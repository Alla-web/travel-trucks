"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./FeilteredTravelTrucks.client.module.css";

import TravelTruckCard from "@/components/TravelTruckCard/TravelTruckCard";
import { GetTravelTucksParams } from "@/types/travelTruck";
import { getTravelTrucks } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

interface FiteredTravelTrucksPageProps {
  page: number;
  limit: number;
  location: string;
  form: string;
  engine: string;
  transmission: string;
  equipment: string[];
}

export default function FiteredTravelTrucksPage({
  page,
  limit = 4,
  location,
  form,
  engine,
  transmission,
  equipment,
}: FiteredTravelTrucksPageProps) {
  const travelTrucksParams: GetTravelTucksParams = {
    page,
    limit,
    location,
    form,
    engine,
    transmission,
    equipment,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "campers",
      page,
      limit,
      location,
      form,
      engine,
      transmission,
      equipment,
    ],
    queryFn: () => getTravelTrucks(travelTrucksParams),
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000,
  });

  return (
    <section className={css.sectionContainer}>
      {isLoading && <Loader />}

      <ul className={css.travelTrucksList}>
        {!isLoading &&
          data?.items?.map((travelTruck) => (
            <li key={travelTruck.id}>
              <TravelTruckCard travelTruck={travelTruck} />
            </li>
          ))}
      </ul>

      {!isLoading && Number(data?.total) > 4 && (
        <button className={css.loadMoreBtn} type="button">
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
