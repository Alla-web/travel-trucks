import css from "./TravelTruckReviewsSection.module.css";

import { TravelTruck } from "@/types/travelTruck";

interface TravelTruckReviewsSectionProps {
  travelTruck: TravelTruck;
}

export default function TravelTruckReviewsSection({
  travelTruck,
}: TravelTruckReviewsSectionProps) {
  return <section className={css.reviewsSection}>{travelTruck.name}</section>;
}
