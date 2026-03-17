"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Show {
  id: string;
  title: string;
  showType: string;
  status: string;
  playwright?: string;
  composer?: string;
  lyricist?: string;
  description?: string;
  tones: string[];
  era?: string;
  genres: string[];
  openingDate?: string;
  closingDate?: string;
}

function formatDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ShowDetailPage() {
  const params = useParams();
  const showId = params.showId as string;
  const [show, setShow] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShow() {
      const res = await fetch(`/api/shows/${showId}`);
      if (res.ok) {
        setShow(await res.json());
      } else {
        setError("Show not found");
      }
      setIsLoading(false);
    }
    fetchShow();
  }, [showId]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-24"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (error || !show) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted-foreground">{error ?? "Show not found"}</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/shows">Back to Shows</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/shows">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shows
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{show.title}</h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="secondary">{show.showType}</Badge>
              <Badge>{formatStatus(show.status)}</Badge>
            </div>
          </div>
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
            <CardContent className="space-y-4">
              {show.playwright && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Playwright</p>
                  <p>{show.playwright}</p>
                </div>
              )}
              {show.composer && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Composer</p>
                  <p>{show.composer}</p>
                </div>
              )}
              {show.lyricist && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lyricist</p>
                  <p>{show.lyricist}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Opening</p>
                  <p>{formatDate(show.openingDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Closing</p>
                  <p>{formatDate(show.closingDate)}</p>
                </div>
              </div>
              {show.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-sm">{show.description}</p>
                </div>
              )}
              {show.tones.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tones</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {show.tones.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                </div>
              )}
              {show.era && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Era</p>
                  <p>{show.era}</p>
                </div>
              )}
              {show.genres.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Genres</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {show.genres.map((g) => <Badge key={g} variant="outline">{g}</Badge>)}
                  </div>
                </div>
              )}
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
