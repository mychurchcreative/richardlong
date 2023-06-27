import { z } from 'zod';

export const siteSettingsZ = z.object({
  title: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  siteUrl: z.string().url().optional().nullable(),
  gtmID: z.string().optional().nullable(),
});

export type SiteSettings = z.infer<typeof siteSettingsZ>;
