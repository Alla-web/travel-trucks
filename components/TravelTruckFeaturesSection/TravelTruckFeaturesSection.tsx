import css from "./TravelTruckFeaturesSection.module.css";

import { TravelTruck } from "@/types/travelTruck";

interface TravelTruckFeaturesSectionProps {
  travelTruck: TravelTruck;
}

export default function TravelTruckFeaturesSection({
  travelTruck,
}: TravelTruckFeaturesSectionProps) {
  return <section className={css.featuresSection}>{travelTruck.name}</section>;
}
