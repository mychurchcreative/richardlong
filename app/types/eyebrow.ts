import { z } from 'zod';

import { linkZ } from './link';

export const eyebrowZ = z.object({
  text: z.string(),
  link: linkZ.optional().nullable(),
});
