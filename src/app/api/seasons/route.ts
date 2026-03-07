import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const seasonCreateSchema = z.object({
  theaterId: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  theme: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

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

  const seasons = await db.season.findMany({
    where: { theaterId },
    include: { shows: { select: { id: true, title: true, status: true } } },
    orderBy: { startDate: "desc" },
  });

  return NextResponse.json(seasons);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = seasonCreateSchema.safeParse(body);

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

    const season = await db.season.create({
      data: {
        ...parsed.data,
        startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
      },
    });

    return NextResponse.json(season, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
