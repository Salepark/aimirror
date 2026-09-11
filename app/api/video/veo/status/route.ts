import { NextResponse } from "next/server";
import { checkVeoJob } from "@/lib/veo";

export const maxDuration = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const operationName = searchParams.get("operationName");
  const lifeId = searchParams.get("lifeId");

  if (!operationName || !lifeId) {
    return NextResponse.json(
      { status: "error", message: "operationName and lifeId are required." },
      { status: 400 }
    );
  }

  try {
    const result = await checkVeoJob(operationName, lifeId);

    if (result.status === "completed" && process.env.NODE_ENV !== "production") {
      console.log(`Veo generation completed and saved to Blob: lifeId=${lifeId}`);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Veo status check failed:", error);
    return NextResponse.json(
      { status: "error", message: "Unable to check animation status." },
      { status: 502 }
    );
  }
}
