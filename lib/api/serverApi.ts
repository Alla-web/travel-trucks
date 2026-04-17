import { nextServer } from "./api";

import { GetTravelTucksParams } from "@/types/travelTruck";

export async function getTravelTrucks(params: GetTravelTucksParams) {
  const response = await nextServer.get("/campers", {
    params,
  });

  return response.data;
}
