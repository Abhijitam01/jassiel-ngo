import { NextResponse } from "next/server";
import { generateCSRFToken } from "@/lib/csrf";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = generateCSRFToken();
  return NextResponse.json({ token });
}

