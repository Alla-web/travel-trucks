import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "All travel trucks list page",
};

export default function Catalog() {
  redirect("/catalog/filter/all");
  return null;
}
