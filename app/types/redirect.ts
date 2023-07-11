import { z } from 'zod';

export const redirectZ = z.object({
  _id: z.string(),
  _type: z.literal('redirect'),
  from: z.string(),
  to: z.string(),
  permanent: z.boolean().optional(),
});

export const redirectsZ = z.array(redirectZ);

export type RedirectsQuery = z.infer<typeof redirectsZ>;

export type Redirect = z.infer<typeof redirectZ> & {
  splat?: boolean;
  code?: number;
};
