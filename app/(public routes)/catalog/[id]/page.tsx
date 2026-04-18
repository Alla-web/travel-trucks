import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import css from "./pag.module.css";

import TravelTruckDetails from "./TravelTruckDetails.client";
import { getTraveltruckById } from "@/lib/api/serverApi";

interface TravelTruckDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function TravelTruckDetailsPage({
  params,
}: TravelTruckDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getTraveltruckById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravelTruckDetails id={id} />
    </HydrationBoundary>
  );
}
