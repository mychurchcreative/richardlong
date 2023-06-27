import type { SanityImageCrop, SanityImageHotspot } from '@sanity/asset-utils';
import { z } from 'zod';

import { schemaForType } from './schemaForType';

export const sanityImageCropZ = schemaForType<SanityImageCrop>()(
  z.object({
    _type: z.literal('sanity.imageCrop'),
    left: z.number(),
    bottom: z.number(),
    right: z.number(),
    top: z.number(),
  })
);

export const sanityImageHotspotZ = schemaForType<SanityImageHotspot>()(
  z.object({
    _type: z.literal('sanity.imageHotspot'),
    width: z.number(),
    height: z.number(),
    x: z.number(),
    y: z.number(),
  })
);

export const sanityImageZ = z.object({
  _id: z.string(),
  _type: z.string(),
  altText: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  metadata: z
    .object({
      lqip: z.string().nullable().optional(),
      dimensions: z.object({
        aspectRatio: z.number(),
        height: z.number(),
        width: z.number(),
      }),
    })
    .optional()
    .nullable(),
});

// Reused a lot through queries
export const sanityImageObjectExtendedZ = z.object({
  asset: sanityImageZ.nullable().optional(),
  // GROQ may return null for these
  // But our type requires them to be undefined if they don't exist
  crop: sanityImageCropZ.nullable().transform((v) => v ?? null),
  hotspot: sanityImageHotspotZ.nullable().transform((v) => v ?? null),
});

export type SanityImageObjectExtended = z.infer<
  typeof sanityImageObjectExtendedZ
>;
