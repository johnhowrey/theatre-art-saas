import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

export const metadata = { title: "Templates - StageArt" };

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">Browse typographic templates for your shows</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Template Library
          </CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Browse 50+ professionally designed typographic templates, tagged by show type,
            tone, and era. Templates are matched to your show context automatically, and you
            can edit copy without changing the layout.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
