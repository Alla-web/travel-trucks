import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { GetTravelTucksParams } from "@/types/travelTruck";
import FilteredTravelTrucksPage from "./FeilteredTravelTrucks.client";
import { getTravelTrucks } from "@/lib/api/serverApi";

interface GenerateMetadataProps {
  searchParams: {
    page?: string;
    limit?: string;
    location?: string;
    form?: string;
    engine?: string;
    transmission?: string;
    equipment?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const location = params.location || "Європа";
  const form = params.form || "всі типи";
  const engine = params.engine || "";
  const transmission = params.transmission || "";

  const filters = [
    location && `локація: ${location}`,
    form && `тип: ${form}`,
    engine && `двигун: ${engine}`,
    transmission && `трансмісія: ${transmission}`,
  ]
    .filter(Boolean)
    .join(", ");

  const title = `Оренда кемперів${filters ? ` (${filters})` : ""} | Сторінка ${page}`;
  const description = `Знайдіть ідеальний кемпер для подорожі. ${
    filters ? `Фільтри: ${filters}.` : ""
  } Переглядайте доступні travel trucks, бронюйте онлайн та подорожуйте комфортно.`;

  const baseUrl = "https://travel-trucks-tau-weld.vercel.app";

  const url = `${baseUrl}/catalog?page=${page}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Travel Trucks",
      images: [
        {
          url: "https://travel-trucks-tau-weld.vercel.app/hero/hero-image-1x.webp",
          width: 1200,
          height: 630,
          alt: "Travel Trucks Catalog",
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
        "https://travel-trucks-tau-weld.vercel.app/hero/hero-image-1x.webp",
      ],
    },

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

interface TravelTrucksPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    location?: string;
    form?: string;
    engine?: string;
    transmission?: string;
    equipment?: string;
  }>;
}

export default async function Catalog({ searchParams }: TravelTrucksPageProps) {
  const queryClient = new QueryClient();

  const searchParameters = await searchParams;
  const page = Number(searchParameters.page) || 1;
  const limit = 4;
  const location = searchParameters.location || "";
  const form = searchParameters.form || "";
  const engine = searchParameters.engine || "";
  const transmission = searchParameters.transmission || "";
  const equipment = searchParameters.equipment?.split(",") || [];

  const travelTrucksParams: GetTravelTucksParams = {
    page: 1,
    limit,
    location,
    form,
    engine,
    transmission,
    equipment,
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "campers-first-page",
      location,
      form,
      engine,
      transmission,
      equipment,
    ],
    queryFn: () => getTravelTrucks(travelTrucksParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredTravelTrucksPage
        initialPage={page}
        limit={limit}
        location={location}
        form={form}
        engine={engine}
        transmission={transmission}
        equipment={equipment}
      />
    </HydrationBoundary>
  );
}
