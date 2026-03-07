import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ seasonId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { seasonId } = await params;
  const season = await db.season.findUnique({
    where: { id: seasonId },
    include: {
      shows: true,
      theater: { include: { members: { where: { userId: session.user.id } } } },
    },
  });

  if (!season || season.theater.members.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(season);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ seasonId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { seasonId } = await params;
  const season = await db.season.findUnique({
    where: { id: seasonId },
    include: { theater: { include: { members: { where: { userId: session.user.id } } } } },
  });

  if (!season || season.theater.members.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.season.delete({ where: { id: seasonId } });

  return NextResponse.json({ success: true });
}
