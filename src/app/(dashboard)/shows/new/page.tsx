import { ShowWizard } from "@/components/shows/show-wizard";

export const metadata = { title: "New Show - StageArt" };

export default function NewShowPage() {
  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Create a New Show</h1>
        <p className="mt-2 text-muted-foreground">
          Tell us about your production and we&apos;ll generate artwork options.
        </p>
      </div>
      <ShowWizard />
    </div>
  );
}
