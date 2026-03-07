import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = req.nextUrl.searchParams.get("q");
  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Search query must be at least 2 characters" }, { status: 400 });
  }

  const titles = await db.licensedTitle.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    include: {
      licensingHouse: { select: { name: true, creditTemplate: true } },
    },
    take: 20,
  });

  return NextResponse.json(titles);
}
