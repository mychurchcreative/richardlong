import { z } from 'zod';

import { sanityDocumentZ } from './document';
import { sanityImageObjectExtendedZ } from './image';
import { richTextZ } from './richText';
import { seoZ } from './seo';

export const postZ = sanityDocumentZ.extend({
  _type: z.literal('post'),
  title: z.string().optional(),
  slug: z.string().optional(),
  body: richTextZ.optional().nullable(),
  featuredImage: sanityImageObjectExtendedZ.nullable().optional(),
  seo: seoZ.optional(),
  publishedAt: z.string().datetime(),
});

export const postsZ = z.array(postZ);

export type Post = z.infer<typeof postZ>;
