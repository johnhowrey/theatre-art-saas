import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { showUpdateSchema } from "@/lib/validators/show";

async function getShowWithAuth(showId: string, userId: string) {
  const show = await db.show.findUnique({
    where: { id: showId },
    include: { theater: { include: { members: { where: { userId } } } } },
  });
  if (!show || show.theater.members.length === 0) return null;
  return show;
}

export async function GET(_req: Request, { params }: { params: Promise<{ showId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { showId } = await params;
  const show = await getShowWithAuth(showId, session.user.id);
  if (!show) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(show);
}

export async function PUT(req: Request, { params }: { params: Promise<{ showId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { showId } = await params;
  const existingShow = await getShowWithAuth(showId, session.user.id);
  if (!existingShow) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = showUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const show = await db.show.update({
    where: { id: showId },
    data: {
      ...parsed.data,
      openingDate: parsed.data.openingDate ? new Date(parsed.data.openingDate) : undefined,
      closingDate: parsed.data.closingDate ? new Date(parsed.data.closingDate) : undefined,
    },
  });

  return NextResponse.json(show);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ showId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { showId } = await params;
  const existingShow = await getShowWithAuth(showId, session.user.id);
  if (!existingShow) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.show.delete({ where: { id: showId } });

  return NextResponse.json({ success: true });
}
