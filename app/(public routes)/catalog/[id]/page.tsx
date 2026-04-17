interface TravelTruckDetailsProps {
  id: string;
}

export default function TravelTruckDetails({ id }: TravelTruckDetailsProps) {
  return <div>`Travel truck with ID - ${id} details`</div>;
}
