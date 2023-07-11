import { z } from 'zod';

import { sanityDocumentZ } from './document';
import { sanityImageObjectExtendedZ } from './image';
import { richTextZ } from './richText';
import { seoZ } from './seo';

export const devotionalZ = sanityDocumentZ.extend({
  _type: z.literal('devotional'),
  title: z.string().optional(),
  slug: z.string().optional(),
  body: richTextZ.optional().nullable(),
  featuredImage: sanityImageObjectExtendedZ.nullable().optional(),
  seo: seoZ.optional(),
});

export const devotionalsZ = z.array(devotionalZ);

export type Devotional = z.infer<typeof devotionalZ>;
