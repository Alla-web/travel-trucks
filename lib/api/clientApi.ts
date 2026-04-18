import { BookingPayload } from "@/types/booking";
import { nextServer } from "./api";

import { GetTravelTucksParams } from "@/types/travelTruck";
import { GetTravelTruckResponse } from "@/types/travelTruck";
import { Booking } from "@/types/booking";

export async function getTravelTrucks(params: GetTravelTucksParams) {
  const response = await nextServer.get<GetTravelTruckResponse>("/campers", {
    params,
    withCredentials: false,
  });
  return response.data;
}

export async function createBooking<Booking>(
  payload: BookingPayload,
): Promise<Booking> {
  const response = await nextServer.post<Booking>("/bookings", payload, {
    withCredentials: false,
  });
  return response.data;
}
