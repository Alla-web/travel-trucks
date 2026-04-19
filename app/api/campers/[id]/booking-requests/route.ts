import { NextResponse } from "next/server";

import { api, ApiError } from "../.././../api";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const payload = {
      name: body.username,
      email: body.email,
      bookingDate: body.bookingDate,
      comment: body.comment,
    };

    const apiRes = await api.post(`/campers/${id}/booking-requests`, payload);

    const res = NextResponse.json(apiRes.data, { status: 201 });
    return res;
  } catch (error) {
    const err = error as ApiError;
    const data = err.response?.data as {
      error?: string;
      message?: string;
      errors?: Array<{ message?: string }>;
    };

    return NextResponse.json(
      {
        error: data?.error ?? data?.message ?? err.message,
        message: data?.message ?? data?.error ?? err.message,
        errors: data?.errors ?? [],
      },
      {
        status: err.response?.status || 500,
      },
    );
  }
}
