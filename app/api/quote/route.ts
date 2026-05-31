import { NextResponse } from "next/server";

// POST handler for quote submissions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, customerName, email, productName, quantity, country, message } = body;

    if (!companyName || !customerName || !email || !productName || !quantity || !country) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Process logic here: In production, this writes to Sanity CMS and triggers Resend email dispatcher.
    // E.g.,
    // await sanityClient.create({ _type: 'quoteSubmission', ... })
    // await resend.emails.send({ ... })

    console.log("Server API Quote received:", body);

    return NextResponse.json({
      success: true,
      message: "Quote inquiry registered successfully."
    });

  } catch (err: any) {
    console.error("API quote error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
