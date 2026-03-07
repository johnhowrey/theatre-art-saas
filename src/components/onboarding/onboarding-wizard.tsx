"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEP_TITLES = [
  "Theater Basics",
  "Location",
  "Theater Type",
  "Brand Assets",
  "Taste Calibration",
];

interface OnboardingData {
  name: string;
  slug: string;
  city: string;
  state: string;
  venueType: string;
  seatingCapacity: string;
  type: "SINGLE_SHOW" | "SEASON";
  equityStatus: string;
  primaryColor: string;
  secondaryColor: string;
  fontPreference: string;
  tasteProfile: string[];
}

const TASTE_STYLES = [
  { id: "bold-modern", label: "Bold & Modern", description: "Clean lines, striking typography" },
  { id: "classic-elegant", label: "Classic & Elegant", description: "Refined, timeless aesthetics" },
  { id: "playful-vibrant", label: "Playful & Vibrant", description: "Colorful, energetic designs" },
  { id: "dark-dramatic", label: "Dark & Dramatic", description: "Moody, intense visuals" },
  { id: "minimalist", label: "Minimalist", description: "Simple, focused compositions" },
  { id: "vintage-retro", label: "Vintage & Retro", description: "Nostalgic, period-inspired looks" },
];

export function OnboardingWizard() {
  const router = useRouter();
  const { currentStep, totalSteps, progress, isFirstStep, isLastStep, goToNext, goToPrev } =
    useMultiStepForm(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState<OnboardingData>({
    name: "",
    slug: "",
    city: "",
    state: "",
    venueType: "",
    seatingCapacity: "",
    type: "SINGLE_SHOW",
    equityStatus: "NON_EQUITY",
    primaryColor: "#000000",
    secondaryColor: "#666666",
    fontPreference: "",
    tasteProfile: [],
  });

  function updateField<K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (field === "name") {
      const slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setData((prev) => ({ ...prev, slug }));
    }
  }

  function toggleTaste(id: string) {
    setData((prev) => ({
      ...prev,
      tasteProfile: prev.tasteProfile.includes(id)
        ? prev.tasteProfile.filter((t) => t !== id)
        : [...prev.tasteProfile, id],
    }));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    const res = await fetch("/api/theaters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        seatingCapacity: data.seatingCapacity ? parseInt(data.seatingCapacity) : undefined,
        tasteProfile: data.tasteProfile,
        onboardingComplete: true,
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}: {STEP_TITLES[currentStep]}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEP_TITLES[currentStep]}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Tell us about your theater"}
            {currentStep === 1 && "Where is your theater located?"}
            {currentStep === 2 && "What kind of theater are you?"}
            {currentStep === 3 && "Set up your brand identity"}
            {currentStep === 4 && "What design styles do you love?"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Theater Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Riverside Community Theater"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" value={data.slug} onChange={(e) => updateField("slug", e.target.value)} />
                <p className="text-xs text-muted-foreground">stageart.com/{data.slug || "your-theater"}</p>
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={data.city} onChange={(e) => updateField("city", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" value={data.state} onChange={(e) => updateField("state", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Venue Type</Label>
                <Select value={data.venueType} onValueChange={(v) => updateField("venueType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select venue type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proscenium">Proscenium</SelectItem>
                    <SelectItem value="thrust">Thrust</SelectItem>
                    <SelectItem value="arena">Arena / In the Round</SelectItem>
                    <SelectItem value="blackbox">Black Box</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Seating Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={data.seatingCapacity}
                  onChange={(e) => updateField("seatingCapacity", e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-3">
                <Label>Theater Type</Label>
                <RadioGroup value={data.type} onValueChange={(v) => updateField("type", v as "SINGLE_SHOW" | "SEASON")}>
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="SINGLE_SHOW" id="single" />
                    <div>
                      <Label htmlFor="single" className="font-medium">Single Show</Label>
                      <p className="text-sm text-muted-foreground">Focus on one production at a time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="SEASON" id="season" />
                    <div>
                      <Label htmlFor="season" className="font-medium">Season Theater</Label>
                      <p className="text-sm text-muted-foreground">Plan a full season with cohesive branding</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Equity Status</Label>
                <Select value={data.equityStatus} onValueChange={(v) => updateField("equityStatus", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NON_EQUITY">Non-Equity</SelectItem>
                    <SelectItem value="SPT">Small Professional Theater (SPT)</SelectItem>
                    <SelectItem value="LORT">LORT</SelectItem>
                    <SelectItem value="OTHER_EQUITY">Other Equity Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="primaryColor"
                    value={data.primaryColor}
                    onChange={(e) => updateField("primaryColor", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border"
                  />
                  <Input value={data.primaryColor} onChange={(e) => updateField("primaryColor", e.target.value)} className="w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={data.secondaryColor}
                    onChange={(e) => updateField("secondaryColor", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border"
                  />
                  <Input value={data.secondaryColor} onChange={(e) => updateField("secondaryColor", e.target.value)} className="w-32" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font Preference</Label>
                <Select value={data.fontPreference} onValueChange={(v) => updateField("fontPreference", v)}>
                  <SelectTrigger><SelectValue placeholder="Select a style" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serif">Serif (Classic, Traditional)</SelectItem>
                    <SelectItem value="sans-serif">Sans-Serif (Modern, Clean)</SelectItem>
                    <SelectItem value="display">Display (Bold, Expressive)</SelectItem>
                    <SelectItem value="script">Script (Elegant, Handwritten)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <p className="text-sm text-muted-foreground">
                Select the design styles that appeal to you. This helps us tailor artwork to your taste.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {TASTE_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => toggleTaste(style.id)}
                    className={`rounded-lg border-2 p-4 text-left transition-colors ${
                      data.tasteProfile.includes(style.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{style.label}</div>
                    <div className="text-sm text-muted-foreground">{style.description}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={goToPrev} disabled={isFirstStep}>
            Back
          </Button>
          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Setting up..." : "Complete Setup"}
            </Button>
          ) : (
            <Button onClick={goToNext}>Continue</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
