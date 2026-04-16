"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./FeilteredTravelTrucks.client.module.css";

import type { TravelTruck } from "@/types/travelTruck";
import TravelTruckCard from "@/components/TravelTruckCard/TravelTruckCard";
import { TravelTruckFilters } from "@/types/travelTruck";
import { GetTravelTucksParams } from "@/types/travelTruck";
import { getTravelTrucks } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

export default function FiteredTravelTrucksPage() {
  const [filters, setFilters] = useState<TravelTruckFilters>({
    location: "",
    form: "",
    engine: "",
    transmission: "",
  });

  const travelTrucksParams: GetTravelTucksParams = {
    location: filters.location,
    form: filters.form,
    engine: filters.engine,
    transmission: filters.transmission,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "capmers",
      filters.location,
      filters.form,
      filters.engine,
      filters.transmission,
    ],
    queryFn: () => getTravelTrucks(travelTrucksParams),
    placeholderData: keepPreviousData,
    staleTime: 1 * 60 * 1000,
  });

  return (
    <section>
      {isLoading && <Loader />}

      <ul className={css.tracelTrucksList}>
        {!isLoading &&
          data?.items?.map((travelTruck) => (
            <li key={travelTruck.id}>
              <TravelTruckCard travelTruck={travelTruck} />
            </li>
          ))}
      </ul>
    </section>
  );
}
