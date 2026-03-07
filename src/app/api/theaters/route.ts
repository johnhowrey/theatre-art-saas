import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { theaterCreateSchema } from "@/lib/validators/theater";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const theaters = await db.theater.findMany({
    where: { members: { some: { userId: session.user.id } } },
    include: { members: { where: { userId: session.user.id } } },
  });

  return NextResponse.json(theaters);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = theaterCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const existingSlug = await db.theater.findUnique({ where: { slug: parsed.data.slug } });
    if (existingSlug) {
      return NextResponse.json({ error: "Slug already taken" }, { status: 409 });
    }

    const theater = await db.theater.create({
      data: {
        ...parsed.data,
        onboardingComplete: body.onboardingComplete ?? false,
        tasteProfile: body.tasteProfile ?? undefined,
        members: {
          create: { userId: session.user.id, role: "OWNER" },
        },
        creditBalance: {
          create: { balance: 0 },
        },
        subscription: {
          create: { tier: "FREE", status: "ACTIVE" },
        },
      },
    });

    return NextResponse.json(theater, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
