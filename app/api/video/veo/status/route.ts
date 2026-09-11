import { NextResponse } from "next/server";
import { checkVeoJob } from "@/lib/veo";

export const maxDuration = 60;

export async function GET(request: Request) {
  const operationName = new URL(request.url).searchParams.get("operationName");

  if (!operationName) {
    return NextResponse.json(
      { status: "error", message: "operationName is required." },
      { status: 400 }
    );
  }

  try {
    const result = await checkVeoJob(operationName);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Veo status check failed:", error);
    return NextResponse.json(
      { status: "error", message: "Unable to check animation status." },
      { status: 502 }
    );
  }
}
