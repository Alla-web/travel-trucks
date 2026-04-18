import BookTravelTruckForm from "@/components/BookTravelTruckForm/BookTravelTruckForm";

interface TravelTruckDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function TravelTruckDetails({
  params,
}: TravelTruckDetailsProps) {
  const { id } = await params;
  console.log("TravelTruckDetails ID: ", id);
  return (
    <div>
      <p style={{ marginBottom: "40px" }}>
        {`Travel truck with ID - ${id} - details`}
      </p>
      <BookTravelTruckForm id={id} />
    </div>
  );
}
