import { NextRequest, NextResponse } from "next/server";

import { api, ApiError } from "../api";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const response = await api.get("/campers", {
      params: {
        location: searchParams.get("location") || undefined,
        form: searchParams.get("form") || undefined,
        engine: searchParams.get("engine") || undefined,
        transmission: searchParams.get("transmission") || undefined,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      { error: err.response?.data?.error ?? err.message },
      { status: err.response?.status || 500 },
    );
  }
}
