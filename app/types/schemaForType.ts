import type { TypedObject } from 'sanity';
import { z } from 'zod';

// This function takes in a type, and returns a type to Zod
export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

// This is the shape of the "TypedObject" Type from Portable Text
const baseTypedObjectZ = z.object({
  _type: z.string(),
  _key: z.string(),
});
// .passthrough();

// Here we use the helper function to wrap our Zod object
export const typedObjectZ = schemaForType<TypedObject>()(baseTypedObjectZ);
