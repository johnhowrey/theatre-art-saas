"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useTheater } from "@/hooks/use-theater";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Show {
  id: string;
  title: string;
  showType: string;
  status: string;
  openingDate: string | null;
  closingDate: string | null;
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  DRAFT: "secondary",
  IN_PROGRESS: "outline",
  ARTWORK_READY: "default",
  CAMPAIGN_ACTIVE: "default",
  COMPLETED: "secondary",
};

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ShowsPage() {
  const { theater, isLoading: theaterLoading } = useTheater();
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!theater) return;
    async function fetchShows() {
      const res = await fetch(`/api/shows?theaterId=${theater!.id}`);
      if (res.ok) {
        setShows(await res.json());
      }
      setIsLoading(false);
    }
    fetchShows();
  }, [theater]);

  const loading = theaterLoading || (theater && isLoading);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shows</h1>
          <p className="text-muted-foreground">Manage your productions</p>
        </div>
        <Button asChild>
          <Link href="/shows/new">
            <Plus className="mr-2 h-4 w-4" />
            New Show
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                  Loading...
                </TableCell>
              </TableRow>
            ) : shows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                  No shows yet. Create your first show to get started.
                </TableCell>
              </TableRow>
            ) : (
              shows.map((show) => (
                <TableRow key={show.id}>
                  <TableCell className="font-medium">
                    <Link href={`/shows/${show.id}`} className="hover:underline">
                      {show.title}
                    </Link>
                  </TableCell>
                  <TableCell>{show.showType}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[show.status] ?? "secondary"}>
                      {formatStatus(show.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDate(show.openingDate)}
                    {show.closingDate && ` – ${formatDate(show.closingDate)}`}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/shows/${show.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
