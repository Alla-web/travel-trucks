import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { GetTravelTucksParams } from "@/types/travelTruck";
import FilteredTravelTrucksPage from "./FeilteredTravelTrucks.client";
import { getTravelTrucks } from "@/lib/api/serverApi";

interface TravelTrucksPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    location?: string;
    form?: string;
    engine?: string;
    transmission?: string;
    equipment?: string;
  }>;
}

export default async function Catalog({ searchParams }: TravelTrucksPageProps) {
  const queryClient = new QueryClient();

  const searchParameters = await searchParams;
  const page = Number(searchParameters.page) || 1;
  const limit = Number(searchParameters.limit) || 4;
  const location = searchParameters.location || "";
  const form = searchParameters.form || "";
  const engine = searchParameters.engine || "";
  const transmission = searchParameters.transmission || "";
  const equipment = searchParameters.equipment?.split(",") || [];

  const travelTrucksParams: GetTravelTucksParams = {
    page,
    limit,
    location,
    form,
    engine,
    transmission,
    equipment,
  };

  await queryClient.prefetchQuery({
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
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredTravelTrucksPage
        page={page}
        limit={limit}
        location={location}
        form={form}
        engine={engine}
        transmission={transmission}
        equipment={equipment}
      />
    </HydrationBoundary>
  );
}
