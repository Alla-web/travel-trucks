import { nextServer } from "./api";

import { GetTravelTucksParams } from "@/types/travelTruck";
import { GetTravelTruckResponse } from "@/types/travelTruck";

export async function getTravelTrucks(params: GetTravelTucksParams) {
  const response = await nextServer.get<GetTravelTruckResponse>("/campers", {
    params,
    withCredentials: false,
  });

  return response.data;
}
