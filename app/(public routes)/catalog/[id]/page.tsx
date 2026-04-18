import TravelTruckDetails from "./TravelTruckDetails.client";
import BookingTravelTruckForm from "@/components/BookingTravelTruckForm/BookingTravelTruckForm";

import css from "./pag.module.css";

interface TravelTruckDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function TravelTruckDetailsPage({
  params,
}: TravelTruckDetailsProps) {
  const { id } = await params;

  return (
    <div className={css.pageContainer}>
      <TravelTruckDetails id={id} />
    </div>
  );
}
