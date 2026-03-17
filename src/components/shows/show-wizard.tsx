"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { useTheater } from "@/hooks/use-theater";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SHOW_TYPES, TONES, ERAS, GENRES } from "@/constants/show-options";
import { CAMPAIGN_TYPES, CAMPAIGN_FORMATS } from "@/constants/campaign-packages";

const STEP_TITLES = ["Show Basics", "Production Context", "Campaign Needs", "Creative Direction", "Finalize"];

interface ShowData {
  title: string;
  showType: string;
  playwright: string;
  composer: string;
  lyricist: string;
  openingDate: string;
  closingDate: string;
  description: string;
  tones: string[];
  era: string;
  genres: string[];
  campaignType: string;
  selectedFormats: string[];
  artTier: string;
}

export function ShowWizard() {
  const router = useRouter();
  const { theater, isLoading: theaterLoading } = useTheater();
  const { currentStep, totalSteps, progress, isFirstStep, isLastStep, goToNext, goToPrev } =
    useMultiStepForm(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [data, setData] = useState<ShowData>({
    title: "",
    showType: "MUSICAL",
    playwright: "",
    composer: "",
    lyricist: "",
    openingDate: "",
    closingDate: "",
    description: "",
    tones: [],
    era: "",
    genres: [],
    campaignType: "DIGITAL",
    selectedFormats: [],
    artTier: "FREE",
  });

  function updateField<K extends keyof ShowData>(field: K, value: ShowData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArrayField(field: "tones" | "genres", value: string) {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  }

  function toggleFormat(name: string) {
    setData((prev) => ({
      ...prev,
      selectedFormats: prev.selectedFormats.includes(name)
        ? prev.selectedFormats.filter((f) => f !== name)
        : [...prev.selectedFormats, name],
    }));
  }

  async function handleSubmit() {
    if (!theater) {
      setSubmitError("No theater found. Please complete onboarding first.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    const res = await fetch("/api/shows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        theaterId: theater.id,
        openingDate: data.openingDate ? new Date(data.openingDate).toISOString() : undefined,
        closingDate: data.closingDate ? new Date(data.closingDate).toISOString() : undefined,
      }),
    });

    if (res.ok) {
      const show = await res.json();
      router.push(`/shows/${show.id}`);
      router.refresh();
    } else {
      const err = await res.json().catch(() => null);
      setSubmitError(err?.error ?? "Failed to create show. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (theaterLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!theater) {
    return (
      <div className="mx-auto max-w-md text-center py-24">
        <h2 className="text-xl font-semibold">Set Up Your Theater First</h2>
        <p className="mt-2 text-muted-foreground">
          You need to complete onboarding before creating a show.
        </p>
        <Button className="mt-4" onClick={() => router.push("/onboarding")}>
          Complete Setup
        </Button>
      </div>
    );
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
            {currentStep === 0 && "Tell us about your show"}
            {currentStep === 1 && "Set the mood and context"}
            {currentStep === 2 && "What assets do you need?"}
            {currentStep === 3 && "Choose your creative direction"}
            {currentStep === 4 && "Review and create your show"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Show Title</Label>
                <Input id="title" value={data.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Into the Woods" />
              </div>
              <div className="space-y-2">
                <Label>Show Type</Label>
                <Select value={data.showType} onValueChange={(v) => updateField("showType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SHOW_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="playwright">Playwright</Label>
                <Input id="playwright" value={data.playwright} onChange={(e) => updateField("playwright", e.target.value)} />
              </div>
              {(data.showType === "MUSICAL" || data.showType === "OPERA") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="composer">Composer</Label>
                    <Input id="composer" value={data.composer} onChange={(e) => updateField("composer", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lyricist">Lyricist</Label>
                    <Input id="lyricist" value={data.lyricist} onChange={(e) => updateField("lyricist", e.target.value)} />
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="opening">Opening Date</Label>
                  <Input id="opening" type="date" value={data.openingDate} onChange={(e) => updateField("openingDate", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing">Closing Date</Label>
                  <Input id="closing" type="date" value={data.closingDate} onChange={(e) => updateField("closingDate", e.target.value)} />
                </div>
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="description">Show Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Brief description of your production's vision and approach..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Tone (select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => toggleArrayField("tones", tone)}
                      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                        data.tones.includes(tone) ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Era / Setting</Label>
                <Select value={data.era} onValueChange={(v) => updateField("era", v)}>
                  <SelectTrigger><SelectValue placeholder="Select era" /></SelectTrigger>
                  <SelectContent>
                    {ERAS.map((era) => (
                      <SelectItem key={era} value={era}>{era}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Genre (select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleArrayField("genres", genre)}
                      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                        data.genres.includes(genre) ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-3">
                <Label>Campaign Type</Label>
                <RadioGroup value={data.campaignType} onValueChange={(v) => updateField("campaignType", v)}>
                  {CAMPAIGN_TYPES.map((ct) => (
                    <div key={ct.value} className="flex items-start space-x-3 rounded-md border p-4">
                      <RadioGroupItem value={ct.value} id={ct.value} />
                      <div>
                        <Label htmlFor={ct.value} className="font-medium">{ct.label}</Label>
                        <p className="text-sm text-muted-foreground">{ct.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label>Included Formats</Label>
                {(data.campaignType === "DIGITAL" || data.campaignType === "DIGITAL_PRINT") && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Digital</p>
                    {CAMPAIGN_FORMATS.DIGITAL.map((f) => (
                      <div key={f.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={f.name}
                          checked={data.selectedFormats.includes(f.name)}
                          onCheckedChange={() => toggleFormat(f.name)}
                        />
                        <Label htmlFor={f.name} className="text-sm font-normal">
                          {f.name} ({f.width}x{f.height}{f.unit})
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {(data.campaignType === "PRINT" || data.campaignType === "DIGITAL_PRINT") && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Print</p>
                    {CAMPAIGN_FORMATS.PRINT.map((f) => (
                      <div key={f.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={f.name}
                          checked={data.selectedFormats.includes(f.name)}
                          onCheckedChange={() => toggleFormat(f.name)}
                        />
                        <Label htmlFor={f.name} className="text-sm font-normal">
                          {f.name} ({f.width}x{f.height}{f.unit})
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="space-y-3">
                <Label>Art Tier</Label>
                <RadioGroup value={data.artTier} onValueChange={(v) => updateField("artTier", v)}>
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="FREE" id="free" />
                    <div>
                      <Label htmlFor="free" className="font-medium">Free - Stock Library</Label>
                      <p className="text-sm text-muted-foreground">Choose from curated stock images and typographic templates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="PAID" id="paid" />
                    <div>
                      <Label htmlFor="paid" className="font-medium">Paid - AI Generated</Label>
                      <p className="text-sm text-muted-foreground">Custom key art generated from your show description</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="PREMIUM" id="premium" />
                    <div>
                      <Label htmlFor="premium" className="font-medium">Premium - Headshot Integration</Label>
                      <p className="text-sm text-muted-foreground">AI composites your cast headshots into the key art</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <p className="text-sm text-muted-foreground">
                Template browser and detailed creative controls will be available after creating the show.
              </p>
            </>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Show</h3>
                <p className="text-lg font-semibold">{data.title || "Untitled"}</p>
                <Badge variant="secondary">{SHOW_TYPES.find((t) => t.value === data.showType)?.label}</Badge>
              </div>
              {data.playwright && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">By</h3>
                  <p>{data.playwright}</p>
                </div>
              )}
              {data.tones.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tone</h3>
                  <div className="flex flex-wrap gap-1">{data.tones.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}</div>
                </div>
              )}
              {data.era && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Era</h3>
                  <p>{data.era}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Campaign</h3>
                <p>{CAMPAIGN_TYPES.find((c) => c.value === data.campaignType)?.label}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Art Tier</h3>
                <Badge>{data.artTier}</Badge>
              </div>
            </div>
          )}
        </CardContent>

        {submitError && (
          <div className="mx-6 mb-2 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={goToPrev} disabled={isFirstStep}>
            Back
          </Button>
          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Creating show..." : "Create Show"}
            </Button>
          ) : (
            <Button onClick={goToNext}>Continue</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
