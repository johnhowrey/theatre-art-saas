import Link from "next/link";
import { Sparkles, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description:
      "Generate professional key art from your show description. The tool designs — you make choices.",
  },
  {
    icon: Printer,
    title: "Print-Ready Assets",
    description:
      "High-res posters, playbill covers, and postcards with bleed marks. Order prints directly.",
  },
  {
    icon: Share2,
    title: "Digital Campaigns",
    description:
      "Instagram, Facebook, TikTok, and email assets sized perfectly for every platform.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with stock imagery",
    features: ["1 watermarked asset", "Stock image library", "50 typographic templates"],
  },
  {
    name: "Starter",
    price: "$29/mo",
    description: "Full toolkit for individual shows",
    features: ["Unlimited high-res assets", "AI key art generation", "Digital + print formats", "No watermarks"],
  },
  {
    name: "Professional",
    price: "$79/mo",
    description: "Season planning and premium features",
    features: [
      "Everything in Starter",
      "Season planning tools",
      "Cast headshot integration",
      "Priority generation",
    ],
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Professional Show Artwork,{" "}
          <span className="text-muted-foreground">Without the Designer Price Tag</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Purpose-built for community theaters, schools, and small theater groups. Generate
          stunning marketing artwork for your productions in minutes, not weeks.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/sign-up">Start Creating Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#features">See How It Works</a>
          </Button>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-24">
        <h2 className="text-center text-3xl font-bold">Everything Your Show Needs</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          From first concept to opening night, StageArt creates a complete marketing toolkit
          for your production.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-24">
        <h2 className="text-center text-3xl font-bold">Simple, Transparent Pricing</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Start free, upgrade when you need more. No hidden fees.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={tier.name === "Starter" ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="text-3xl font-bold">{tier.price}</div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant={tier.name === "Starter" ? "default" : "outline"} asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
