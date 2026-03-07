import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export const metadata = { title: "Setup Your Theater - StageArt" };

export default function OnboardingPage() {
  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Set Up Your Theater</h1>
        <p className="mt-2 text-muted-foreground">
          Tell us about your theater so we can create personalized designs.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  );
}
