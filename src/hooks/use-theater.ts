"use client";

import { useEffect, useState } from "react";

interface Theater {
  id: string;
  name: string;
  slug: string;
  type: string;
  onboardingComplete: boolean;
  city?: string;
  state?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
}

export function useTheater() {
  const [theater, setTheater] = useState<Theater | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTheater() {
      try {
        const res = await fetch("/api/theaters");
        if (!res.ok) {
          setError("Failed to load theater");
          return;
        }
        const theaters = await res.json();
        setTheater(theaters[0] ?? null);
      } catch {
        setError("Failed to load theater");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTheater();
  }, []);

  return { theater, isLoading, error };
}
