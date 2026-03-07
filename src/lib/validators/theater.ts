import { z } from "zod";

export const theaterCreateSchema = z.object({
  name: z.string().min(2, "Theater name must be at least 2 characters"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  type: z.enum(["SINGLE_SHOW", "SEASON"]),
  equityStatus: z.enum(["NON_EQUITY", "SPT", "LORT", "OTHER_EQUITY"]).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  venueType: z.string().optional(),
  seatingCapacity: z.number().int().positive().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontPreference: z.string().optional(),
});

export const theaterUpdateSchema = theaterCreateSchema.partial();

export type TheaterCreateInput = z.infer<typeof theaterCreateSchema>;
export type TheaterUpdateInput = z.infer<typeof theaterUpdateSchema>;
