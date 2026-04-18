import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "@/app/api/api";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  console.log("API ROUTE HIT!");

  try {
    const { id } = await params;
    const apiRes = await api.get(`/campers/${id}`);
    return NextResponse.json(apiRes.data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      {
        status: err.response?.status || 500,
      },
    );
  }
}
