import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export const metadata = { title: "Seasons - StageArt" };

export default function SeasonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Seasons</h1>
        <p className="text-muted-foreground">Plan your full season with cohesive branding</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Season Planning
          </CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Season planning lets you create a cohesive visual identity across all your
            productions. Group shows together, define a season theme, and generate unified
            marketing materials.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
