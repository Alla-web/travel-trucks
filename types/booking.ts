export interface CreateTravelTruckBookingForm {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  bookingDate: string | Date | null;
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
