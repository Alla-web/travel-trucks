import { BookingPayload } from "@/types/booking";
import { nextServer } from "./api";

import { GetTravelTucksParams } from "@/types/travelTruck";
import { GetTravelTruckResponse } from "@/types/travelTruck";
import { Booking } from "@/types/booking";
import { TravelTruck } from "@/types/travelTruck";

export async function getTravelTrucks(params: GetTravelTucksParams) {
  const response = await nextServer.get<GetTravelTruckResponse>("/campers", {
    params,
    withCredentials: false,
  });
  return response.data;
}

export async function getTraveltruckById(id: string) {
  const response = await nextServer.get<TravelTruck>(`/campers/${id}`);
  return response.data;
}

export async function createBooking(
  id: string,
  payload: BookingPayload,
): Promise<Booking> {
  const response = await nextServer.post<Booking>(
    `/campers/${id}/booking-requests`,
    payload,
    {
      withCredentials: false,
    },
  );
  return response.data;
}
