
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/INR",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error("Exchange API HTTP status:", response.status);

      return NextResponse.json(
        { error: "Exchange rate provider unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (data.result !== "success" || !data.rates) {
      console.error("Exchange API response:", data);

      return NextResponse.json(
        { error: "Invalid exchange rate response" },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Exchange API connection error:", error);

    return NextResponse.json(
      { error: "Could not connect to exchange rate provider" },
      { status: 502 }
    );
  }
}
