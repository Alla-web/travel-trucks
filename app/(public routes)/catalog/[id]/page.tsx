import BookTravelTruckForm from "@/components/BookTravelTruckForm/BookTravelTruckForm";

interface TravelTruckDetailsProps {
  id: string;
}

export default function TravelTruckDetails({ id }: TravelTruckDetailsProps) {
  return (
    <div>
      <p style={{ marginBottom: "40px" }}>
        `Travel truck with ID - ${id} details`
      </p>
      <BookTravelTruckForm />
    </div>
  );
}
