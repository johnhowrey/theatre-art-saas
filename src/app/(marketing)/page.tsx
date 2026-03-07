import Link from "next/link";
import { Sparkles, Printer, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const showcaseExamples = [
  {
    show: "Into the Woods",
    theater: "Riverside Community Theater",
    style: "Dark & Dramatic",
    gradient: "from-emerald-900 via-emerald-950 to-black",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-400",
    description: "A moody, enchanted forest aesthetic with deep greens and gold typography",
    formats: ["24×36 Poster", "Instagram Story", "Playbill Cover", "Postcard"],
  },
  {
    show: "The Importance of Being Earnest",
    theater: "Lakewood Players",
    style: "Classic & Elegant",
    gradient: "from-amber-50 via-amber-100 to-amber-200",
    accent: "text-amber-900",
    accentBg: "bg-amber-900",
    description: "Refined serif typography with a warm, vintage color palette",
    formats: ["11×17 Poster", "Facebook Event", "Program Cover", "Email Banner"],
  },
  {
    show: "Rent",
    theater: "Spotlight Youth Theater",
    style: "Bold & Modern",
    gradient: "from-red-600 via-orange-500 to-yellow-500",
    accent: "text-white",
    accentBg: "bg-white",
    description: "High-energy gradients with bold sans-serif type and gritty textures",
    formats: ["24×36 Poster", "TikTok Video", "Instagram Post", "Yard Sign"],
  },
];

const beforeAfter = [
  { label: "Word doc flyer", time: "3 hours in Word", quality: "Clip art, misaligned text" },
  { label: "StageArt poster", time: "2 minutes", quality: "Professional, print-ready, on-brand" },
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
      {/* Hero */}
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
            <Link href="/onboarding">Start Creating Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#showcase">See Examples</a>
          </Button>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">See What StageArt Creates</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Real examples of complete marketing packages generated for community theater productions.
          </p>

          <div className="mt-16 space-y-20">
            {showcaseExamples.map((example) => (
              <div key={example.show} className="grid items-center gap-8 md:grid-cols-2">
                {/* Poster mockup */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Main poster */}
                    <div
                      className={`aspect-[2/3] w-64 rounded-lg bg-gradient-to-b ${example.gradient} p-8 shadow-2xl sm:w-72`}
                    >
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <p className={`text-xs font-medium uppercase tracking-[0.3em] ${example.accent} opacity-70`}>
                            {example.theater}
                          </p>
                          <p className={`text-xs ${example.accent} mt-1 opacity-50`}>presents</p>
                        </div>
                        <div>
                          <h3 className={`text-3xl font-bold leading-tight ${example.accent} sm:text-4xl`}>
                            {example.show}
                          </h3>
                          <div className={`mt-4 h-px w-16 ${example.accentBg} opacity-40`} />
                          <p className={`mt-3 text-xs ${example.accent} opacity-60`}>
                            March 15 – April 2 &bull; Tickets at the door
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Floating format cards */}
                    <div className="absolute -right-4 -top-2 rotate-3 rounded-md border bg-card p-2 shadow-md sm:-right-8">
                      <div className={`aspect-[9/16] w-16 rounded bg-gradient-to-b ${example.gradient} sm:w-20`} />
                      <p className="mt-1 text-center text-[10px] text-muted-foreground">IG Story</p>
                    </div>
                    <div className="absolute -bottom-3 -left-4 -rotate-2 rounded-md border bg-card p-2 shadow-md sm:-left-8">
                      <div className={`aspect-square w-16 rounded bg-gradient-to-b ${example.gradient} sm:w-20`} />
                      <p className="mt-1 text-center text-[10px] text-muted-foreground">Social Post</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <Badge variant="secondary" className="mb-3">{example.style}</Badge>
                  <h3 className="text-2xl font-bold">{example.show}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{example.theater}</p>
                  <p className="mt-4 text-muted-foreground">{example.description}</p>
                  <div className="mt-6">
                    <p className="text-sm font-medium">Full package includes:</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {example.formats.map((format) => (
                        <Badge key={format} variant="outline">{format}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-center text-3xl font-bold">Stop Settling for Clip Art</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Most community theaters spend hours in Word or Canva wrestling with generic templates.
          StageArt gives you professional results in minutes.
        </p>
        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          {/* Before */}
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/20 p-6">
            <p className="mb-4 text-sm font-medium text-destructive">Before StageArt</p>
            <div className="aspect-[2/3] rounded bg-muted p-6">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="h-20 w-20 rounded bg-muted-foreground/10" />
                <div className="space-y-2">
                  <div className="mx-auto h-4 w-32 rounded bg-muted-foreground/10" />
                  <div className="mx-auto h-3 w-24 rounded bg-muted-foreground/10" />
                  <div className="mx-auto h-3 w-28 rounded bg-muted-foreground/10" />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Comic Sans &bull; Clip art &bull; Misaligned
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium">{beforeAfter[0].time}</p>
              <p className="text-xs text-muted-foreground">{beforeAfter[0].quality}</p>
            </div>
          </div>

          {/* After */}
          <div className="rounded-lg border-2 border-primary/30 p-6 shadow-lg">
            <p className="mb-4 text-sm font-medium text-primary">With StageArt</p>
            <div className="aspect-[2/3] overflow-hidden rounded bg-gradient-to-b from-indigo-900 via-purple-900 to-black p-6">
              <div className="flex h-full flex-col justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-purple-300 opacity-70">
                  Your Theater Name
                </p>
                <div>
                  <h3 className="text-3xl font-bold leading-tight text-white">
                    A Midsummer Night&#39;s Dream
                  </h3>
                  <div className="mt-3 h-px w-12 bg-purple-400 opacity-50" />
                  <p className="mt-2 text-xs text-purple-200 opacity-60">
                    June 1 – 15 &bull; Under the Stars
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium">{beforeAfter[1].time}</p>
              <p className="text-xs text-muted-foreground">{beforeAfter[1].quality}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/onboarding">
              Try It Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="border-y bg-muted/30 py-24">
        <div className="container mx-auto px-4">
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
        </div>
      </section>

      {/* Pricing */}
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
                  <Link href="/onboarding">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
