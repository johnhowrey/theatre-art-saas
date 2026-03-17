"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Layout, CalendarDays, CheckCircle } from "lucide-react";
import { useTheater } from "@/hooks/use-theater";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Show {
  id: string;
  title: string;
  status: string;
  showType: string;
}

export default function DashboardPage() {
  const { theater, isLoading } = useTheater();
  const [recentShows, setRecentShows] = useState<Show[]>([]);

  useEffect(() => {
    if (!theater) return;
    async function fetchShows() {
      const res = await fetch(`/api/shows?theaterId=${theater!.id}`);
      if (res.ok) {
        const shows = await res.json();
        setRecentShows(shows.slice(0, 5));
      }
    }
    fetchShows();
  }, [theater]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {theater ? `Welcome back, ${theater.name}` : "Welcome back to StageArt"}
          </p>
        </div>
        <Button asChild>
          <Link href="/shows/new">
            <Plus className="mr-2 h-4 w-4" />
            New Show
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Theater Profile
            </CardTitle>
            <CardDescription>Your theater setup</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : theater?.onboardingComplete ? (
              <>
                <Badge className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Setup Complete
                </Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  {[theater.city, theater.state].filter(Boolean).join(", ") || "Profile configured"}
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/settings">Edit Profile</Link>
                </Button>
              </>
            ) : (
              <>
                <Badge variant="secondary">Setup Incomplete</Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  Complete your theater profile to get personalized designs.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/onboarding">Complete Setup</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Recent Shows
            </CardTitle>
            <CardDescription>Your latest productions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentShows.length > 0 ? (
              <ul className="space-y-2">
                {recentShows.map((show) => (
                  <li key={show.id}>
                    <Link
                      href={`/shows/${show.id}`}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                    >
                      <span className="font-medium">{show.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {show.status.replace(/_/g, " ")}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No shows yet. Create your first show to get started.</p>
            )}
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href={recentShows.length > 0 ? "/shows" : "/shows/new"}>
                {recentShows.length > 0 ? "View All Shows" : "Create Show"}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/shows/new">New Show</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/templates">Browse Templates</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/seasons">View Seasons</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
