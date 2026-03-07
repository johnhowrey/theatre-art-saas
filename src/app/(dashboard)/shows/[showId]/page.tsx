import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Show Details - StageArt" };

export default function ShowDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Show Details</h1>
          <Badge variant="secondary">Draft</Badge>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="artwork">Artwork</TabsTrigger>
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Production Details</CardTitle>
              <CardDescription>Core information about your show</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Show details will be populated once connected to the database.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artwork">
          <Card>
            <CardHeader>
              <CardTitle>Artwork</CardTitle>
              <CardDescription>Generated key art and assets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No artwork generated yet. Complete the creative direction to generate options.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaign">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Assets</CardTitle>
              <CardDescription>Marketing materials for your show</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Campaign assets will be available after artwork is finalized.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
