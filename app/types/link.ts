import { z } from 'zod';

const linkBaseZ = z.object({
  _key: z.string().optional(),
  linkText: z.string().optional().nullable(),
  href: z.string(),
});

export const linkInternalZ = linkBaseZ.extend({
  _type: z.literal('linkInternal'),
});

export const linkExternalZ = linkBaseZ.extend({
  _type: z.literal('linkExternal'),
  newWindow: z.boolean(),
});

export const linkTypesZ = z.object({
  _type: z.enum(['linkInternal', 'linkExternal']),
});

export const linkZ = z.union([linkInternalZ, linkExternalZ]);

export type linkInternal = z.infer<typeof linkInternalZ>;
export type linkExternal = z.infer<typeof linkExternalZ>;
export type LinkTypes = z.infer<typeof linkTypesZ>;
export type Link = z.infer<typeof linkZ> & {
  children?: React.ReactNode;
  className?: string;
  theme?: 'primary' | 'secondary' | 'tertiary';
  replaceClassNames?: boolean;
};
