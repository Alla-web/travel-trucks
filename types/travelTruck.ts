export interface TravelTruckImage {
  thumb: string;
  original: string;
}

export interface TravelTruckReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface TravelTruck {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: "alcove" | "panelTruck" | "fullyIntegrated";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid";
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  gallery: TravelTruckImage[];
  reviews: TravelTruckReview[];
}

export interface TravelTruckFilters {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
}

export interface GetTravelTucksParams {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
}

export interface GetTravelTruckResponse {
  total: number;
  items: TravelTruck[];
}
