import Link from "next/link";
import { Plus, Layout, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Dashboard - StageArt" };

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to StageArt</p>
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
            <Badge variant="secondary">Setup Incomplete</Badge>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete your theater profile to get personalized designs.
            </p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href="/onboarding">Complete Setup</Link>
            </Button>
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
            <p className="text-sm text-muted-foreground">No shows yet. Create your first show to get started.</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href="/shows/new">Create Show</Link>
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
