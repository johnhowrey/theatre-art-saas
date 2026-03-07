import { z } from "zod";

export const showCreateSchema = z.object({
  theaterId: z.string().cuid(),
  seasonId: z.string().cuid().optional(),
  title: z.string().min(1, "Title is required"),
  showType: z.enum(["MUSICAL", "PLAY", "OPERA", "BALLET", "REVUE", "OTHER"]),
  playwright: z.string().optional(),
  composer: z.string().optional(),
  lyricist: z.string().optional(),
  description: z.string().optional(),
  tones: z.array(z.string()).optional(),
  era: z.string().optional(),
  genres: z.array(z.string()).optional(),
  openingDate: z.string().datetime().optional(),
  closingDate: z.string().datetime().optional(),
  licensedTitleId: z.string().cuid().optional(),
});

export const showUpdateSchema = showCreateSchema.partial().omit({ theaterId: true });

export type ShowCreateInput = z.infer<typeof showCreateSchema>;
export type ShowUpdateInput = z.infer<typeof showUpdateSchema>;
