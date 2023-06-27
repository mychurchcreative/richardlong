import type { TypeOf } from 'zod';
import { z } from 'zod';

const zodEnv = z.object({
  // SANITY
  SANITY_DATASET: z.union([z.literal('production'), z.literal('staging')]),
  SANITY_API_VERSION: z.string(), // format to use: YYYY-MM-DD
  SANITY_STUDIO_BASE_PATH: z.string(), // start with / and end without /
  SANITY_API_READ_TOKEN: z.string(),
  SANITY_API_WRITE_TOKEN: z.string(),
  SANITY_PREVIEW_SECRET: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof zodEnv> {}
  }
}

try {
  zodEnv.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(', ')}` : field
      )
      .join('\n  ');
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
    process.exit(1);
  }
}
