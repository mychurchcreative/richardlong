import { z } from 'zod';

import { sanityImageObjectExtendedZ } from './image';

export const pastorZ = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  bio: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: sanityImageObjectExtendedZ.optional().nullable(),
});

export type Pastor = z.infer<typeof pastorZ>;
