export interface CreateTravelTruckBookingForm {
  username: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

export interface BookingPayload {
  camperId: string;
  username: string;
  email: string;
  bookingDate: string | null;
  comment: string;
}

export interface Booking {
  id: string;
  camperId: string;
  username: string;
  email: string;
  bookingDate: string;
  comment: string;
  createdAt: string;
}
