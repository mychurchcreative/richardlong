import { z } from 'zod';
export const sanityDocumentZ = z.object({
  _id: z.string(),
  _type: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});
