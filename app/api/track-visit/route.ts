import { NextResponse } from "next/server";

// POST handler for visitor tracking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ip, country, countryCode, city, page } = body;

    // Process logic here: In production, this increments Redis/KV values.
    // E.g.,
    // await redis.incr(`visits:${date}`)
    // await redis.sadd(`locations:${countryCode}`, city)

    console.log("Server API Visit tracked:", { ip, country, city, page });

    return NextResponse.json({
      success: true,
      message: "Visitor session tracked successfully."
    });

  } catch (err: any) {
    console.error("API track-visit error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
