import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { showId, templateId } = body;

  if (!showId) {
    return NextResponse.json({ error: "showId is required" }, { status: 400 });
  }

  // TODO: Integrate Claude API for creative brief generation
  // TODO: Integrate DALL-E/Stable Diffusion for image generation
  return NextResponse.json({
    message: "AI generation endpoint placeholder",
    showId,
    templateId,
    status: "not_implemented",
  });
}
