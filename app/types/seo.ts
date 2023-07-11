import { z } from 'zod';

export const seoZ = z.object({
  _type: z.literal('seo'),
  title: z.string().optional(),
  description: z.string().optional(),
  // og: ogZ,
  canonicalUrl: z.string().url().optional(),
  robots: z
    .array(
      z.enum([
        'noindex',
        'nofollow',
        'noarchive',
        'nosnippet',
        'noimageindex',
        'notranslate',
      ])
    )
    .optional(),
  hidden: z.boolean().default(false).optional(),
});

export type Seo = z.infer<typeof seoZ>;
