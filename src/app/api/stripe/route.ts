import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: Verify Stripe webhook signature
  // const signature = req.headers.get("stripe-signature");

  try {
    const body = await req.text();
    const event = JSON.parse(body);

    switch (event.type) {
      case "checkout.session.completed":
        // TODO: Handle successful checkout
        console.log("Checkout completed:", event.data.object.id);
        break;
      case "customer.subscription.updated":
        // TODO: Update subscription status
        console.log("Subscription updated:", event.data.object.id);
        break;
      case "customer.subscription.deleted":
        // TODO: Handle subscription cancellation
        console.log("Subscription deleted:", event.data.object.id);
        break;
      default:
        console.log("Unhandled webhook event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}
