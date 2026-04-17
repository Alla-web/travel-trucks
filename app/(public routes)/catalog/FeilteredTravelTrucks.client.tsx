"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  limit,
  location,
  form,
  engine,
  transmission,
  equipment,
}: FiteredTravelTrucksPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleLoadMore = () => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    const currentLimit = Number(currentSearchParams.get("limit") ?? "4");
    const step = 4;
    const newLimit = currentLimit + step;

    currentSearchParams.set("page", "1");
    currentSearchParams.set("limit", String(newLimit));

    router.push(`${pathname}?${currentSearchParams.toString()}`);
  };

  const total = Number(data?.total ?? 0);
  const loaded = data?.items?.length ?? 0;
  const hasMore = loaded < total;

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

      {!isLoading && hasMore && (
        <button
          onClick={handleLoadMore}
          className={css.loadMoreBtn}
          type="button"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
