import { z } from 'zod';

import { sanityDocumentZ } from './document';

export const sermonZ = sanityDocumentZ.extend({
  _type: z.literal('sermon'),
  title: z.string().optional(),
  date: z.string().datetime().optional(),
  keyText: z.string().optional(),
  videoId: z.string().optional(),
});

export const sermonsZ = z.array(sermonZ);

export type Sermon = z.infer<typeof sermonZ>;
