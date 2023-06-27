import { z } from 'zod';

import { sanityDocumentZ } from './document';
import { sanityImageObjectExtendedZ } from './image';
import { richTextZ } from './richText';

export const postZ = sanityDocumentZ.extend({
  _type: z.literal('post'),
  title: z.string().optional(),
  slug: z.string().optional(),
  // seo: seo.nullable().optional(),
  // og: ogZ,
  body: richTextZ.optional().nullable(),
  featuredImage: sanityImageObjectExtendedZ.nullable().optional(),
  notQueryable: z.boolean().default(false).nullable(),
});

export const postsZ = z.array(postZ);

export type Post = z.infer<typeof postZ>;
