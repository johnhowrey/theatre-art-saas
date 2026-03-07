import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { showCreateSchema } from "@/lib/validators/show";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const theaterId = req.nextUrl.searchParams.get("theaterId");
  if (!theaterId) {
    return NextResponse.json({ error: "theaterId is required" }, { status: 400 });
  }

  const member = await db.theaterMember.findUnique({
    where: { userId_theaterId: { userId: session.user.id, theaterId } },
  });
  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const shows = await db.show.findMany({
    where: { theaterId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(shows);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = showCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const member = await db.theaterMember.findUnique({
      where: {
        userId_theaterId: { userId: session.user.id, theaterId: parsed.data.theaterId },
      },
    });
    if (!member) {
      return NextResponse.json({ error: "Theater not found" }, { status: 404 });
    }

    const show = await db.show.create({
      data: {
        ...parsed.data,
        tones: parsed.data.tones ?? [],
        genres: parsed.data.genres ?? [],
        openingDate: parsed.data.openingDate ? new Date(parsed.data.openingDate) : undefined,
        closingDate: parsed.data.closingDate ? new Date(parsed.data.closingDate) : undefined,
      },
    });

    return NextResponse.json(show, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
