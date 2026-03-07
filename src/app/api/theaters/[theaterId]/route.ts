import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { theaterUpdateSchema } from "@/lib/validators/theater";

async function getTheaterWithAuth(theaterId: string, userId: string) {
  const member = await db.theaterMember.findUnique({
    where: { userId_theaterId: { userId, theaterId } },
  });
  if (!member) return null;

  const theater = await db.theater.findUnique({ where: { id: theaterId } });
  return { theater, member };
}

export async function GET(_req: Request, { params }: { params: Promise<{ theaterId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { theaterId } = await params;
  const result = await getTheaterWithAuth(theaterId, session.user.id);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result.theater);
}

export async function PUT(req: Request, { params }: { params: Promise<{ theaterId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { theaterId } = await params;
  const result = await getTheaterWithAuth(theaterId, session.user.id);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (result.member.role === "MEMBER") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = theaterUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const theater = await db.theater.update({
    where: { id: theaterId },
    data: parsed.data,
  });

  return NextResponse.json(theater);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ theaterId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { theaterId } = await params;
  const result = await getTheaterWithAuth(theaterId, session.user.id);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (result.member.role !== "OWNER") {
    return NextResponse.json({ error: "Only owners can delete theaters" }, { status: 403 });
  }

  await db.theater.delete({ where: { id: theaterId } });

  return NextResponse.json({ success: true });
}
