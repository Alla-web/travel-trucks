"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import css from "./FeilteredTravelTrucks.client.module.css";

import TravelTruckCard from "@/components/TravelTruckCard/TravelTruckCard";
import { GetTravelTucksParams } from "@/types/travelTruck";
import { getTravelTrucks } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

interface FiteredTravelTrucksPageProps {
  initialPage: number;
  limit: number;
  location: string;
  form: string;
  engine: string;
  transmission: string;
  equipment: string[];
}

export default function FiteredTravelTrucksPage({
  initialPage,
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

  // const travelTrucksParams: GetTravelTucksParams = {
  //   page,
  //   limit,
  //   location,
  //   form,
  //   engine,
  //   transmission,
  //   equipment,
  // };

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: [
  //     "campers",
  //     page,
  //     limit,
  //     location,
  //     form,
  //     engine,
  //     transmission,
  //     equipment,
  //   ],
  //   queryFn: () => getTravelTrucks(travelTrucksParams),
  //   placeholderData: keepPreviousData,
  //   staleTime: 1 * 60 * 1000,
  // });

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [
        "campers",
        limit,
        location,
        form,
        engine,
        transmission,
        equipment,
      ],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const params: GetTravelTucksParams = {
          page: pageParam,
          limit,
          location,
          form,
          engine,
          transmission,
          equipment,
        };

        return getTravelTrucks(params);
      },
      getNextPageParam: (lastPage, allPages) => {
        const total = Number(lastPage?.total ?? 0);
        const loaded = allPages.reduce(
          (sum, page) => sum + (page?.items?.length ?? 0),
          0,
        );
        return loaded < total ? allPages.length + 1 : undefined;
      },
      staleTime: 60 * 1000,
    });

  const allItems = useMemo(() => {
    return data?.pages.flatMap((page) => page.items ?? []) ?? [];
  }, [data]);

  useEffect(() => {
    const loadToInitialPage = async () => {
      if (!data) return;

      const loadedPages = data.pages.length;

      if (initialPage > loadedPages) {
        for (let i = loadedPages; i < initialPage; i += 1) {
          await fetchNextPage();
        }
      }
    };

    loadToInitialPage();
  }, [initialPage, data, fetchNextPage]);

  const scrollRef = useRef<HTMLLIElement | null>(null);
  const prevItemsLength = useRef(allItems.length || 0);

  useEffect(() => {
    if (allItems.length > prevItemsLength.current) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    prevItemsLength.current = allItems.length;
  }, [allItems]);

  const handleLoadMore = async () => {
    if (!hasNextPage || isFetchingNextPage) return;

    await fetchNextPage();

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    const nextPage = (Number(currentSearchParams.get("page")) || 1) + 1;

    currentSearchParams.set("page", String(nextPage));

    router.push(`${pathname}?${currentSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <section className={css.sectionContainer}>
      {isLoading || (isFetchingNextPage && <Loader />)}

      <ul className={css.travelTrucksList}>
        {!isLoading &&
          allItems.map((travelTruck, index) => {
            const isFirstNewItem = index === allItems.length - 4;

            return (
              <li
                key={`${travelTruck.id}-${index}`}
                ref={isFirstNewItem ? scrollRef : null}
              >
                <TravelTruckCard travelTruck={travelTruck} />
              </li>
            );
          })}
      </ul>

      {hasNextPage && (
        <button
          onClick={handleLoadMore}
          className={css.loadMoreBtn}
          type="button"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
