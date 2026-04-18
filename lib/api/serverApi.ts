import next from "next";
import { nextServer } from "./api";

import { GetTravelTucksParams } from "@/types/travelTruck";

export async function getTravelTrucks(params: GetTravelTucksParams) {
  const response = await nextServer.get("/campers", {
    params,
  });
  return response.data;
}

export async function getTraveltruckById(id: string) {
  const response = await nextServer.get(`/campers/${id}`);
  return response.data;
}
