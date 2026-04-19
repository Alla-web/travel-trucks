import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import TravelTruckDetails from "./TravelTruckDetails.client";
import { getTraveltruckById } from "@/lib/api/serverApi";

interface TravelTruckDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: TravelTruckDetailsProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const truck = await getTraveltruckById(id);

    const baseUrl = "https://travel-trucks-tau-weld.vercel.app";
    const title = `${truck.name} | Travel Trucks`;
    const description =
      truck.description?.slice(0, 150) ||
      "Деталі кемпера для комфортної подорожі.";

    const image =
      truck.gallery?.[0]?.original ||
      truck.gallery?.[0] ||
      `${baseUrl}/hero/hero-image-1x.webp`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/catalog/${id}`,
        siteName: "Travel Trucks",
        images: [
          {
            url:
              typeof image === "string"
                ? image
                : `${baseUrl}/hero/hero-image-2x.webp`,
            width: 1200,
            height: 630,
            alt: truck.name,
          },
        ],
        locale: "uk_UA",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          typeof image === "string"
            ? image
            : `${baseUrl}/hero/hero-image-1x.webp`,
        ],
      },
      alternates: {
        canonical: `${baseUrl}/catalog/${id}`,
      },
    };
  } catch {
    return {
      title: "Кемпер не знайдено | Travel Trucks",
      description: "Не вдалося завантажити інформацію про кемпер.",
    };
  }
}

export default async function TravelTruckDetailsPage({
  params,
}: TravelTruckDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getTraveltruckById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravelTruckDetails id={id} />
    </HydrationBoundary>
  );
}
