// app/api/sign-cloudinary-params/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const timestamp = body.timestamp;
  const source = body.source;

  if (!timestamp || !source) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const paramsToSign = {
    timestamp,
    source,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    signature,
  });
}
