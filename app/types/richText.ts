import { defineField } from 'sanity';
import { z } from 'zod';

import { titleCase } from '~/lib/utils/helpers';

import { sanityImageObjectExtendedZ } from './image';
import { typedObjectZ } from './schemaForType';

// To better understand what's going on here, check out the following links:

// https://www.sanity.io/docs/customizing-the-portable-text-editor
// https://www.sanity.io/docs/portable-text-editor-configuration

// Below are the "types" of blocks we want to allow editors to select from in the rich text editor.
// The standard type is the "block" type, but we also want to allow editors to select images.
// Any other non-block types we want to allow editors to select from should be added here and
// added to the "blocks" array at the end of this file.
const blockTypes = ['block', 'image'] as const;
export const blockTypesZ = z.enum(blockTypes);

// The styles we want to allow editors to select from in the rich text editor
// Notice, the absence of h1. We don't let editors insert H1 tags into the block content
// because the H1 is reserved for the document or SEO title.
export const blockStyles = ['normal', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

// Add a title field to each style so that they show up in the dropdown menu of the rich text editor
export const styles = blockStyles.map((value) => ({
  title: titleCase(value),
  value,
}));

// Lists
const listTypes = ['bullet', 'number'] as const;

export const lists = [...listTypes].map((value) => ({
  title: titleCase(value),
  value,
}));

// The marks with which we want to allow editors to "mark" up text, but can add our own custom ones, too.
const markTypes = ['strong', 'em', 'underline', 'strike-through'] as const;
const markZ = z.enum(markTypes);

export const decorators = [...markTypes].map((value) => ({
  title: titleCase(value),
  value,
}));

const linkAnnotation = z.object({
  _key: z.string(),
  _type: z.literal('url'),
  name: z.literal('href'),
});

// just to shut up zod for now on union() args
const anyAnnotation = z.object({
  _key: z.string(),
  _type: z.literal('any'),
});

// TODO: need to add support for other annotation types (e.g. internal links)

const annotationsZ = z.union([linkAnnotation, anyAnnotation]);

// TODO: not sure if we should be accessing these values (_type, _def, etc.) directly
// but it seems to work for now...
const urlFields = [
  defineField({
    title: linkAnnotation.shape._type._def.value.toLocaleUpperCase(),
    name: linkAnnotation.shape.name._def.value,
    type: linkAnnotation.shape._type._def.value,
    validation: (Rule) =>
      Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
  }),
];

const urlAnnotation = {
  title: linkAnnotation.shape._type._def.value.toLocaleUpperCase(),
  name: 'link',
  type: 'object',
  fields: urlFields,
};

const annotations = [urlAnnotation];

export const blockZ = typedObjectZ.extend({
  _type: z.literal(blockTypesZ.enum.block),
  style: z.enum(blockStyles),
  children: z.array(
    typedObjectZ.extend({
      _type: z.literal('span'),
      marks: z.array(markZ).nullable(),
      text: z.string(),
    })
  ),
  level: z.number().optional().nullable(),
  listItem: z.enum(listTypes).optional().nullable(),
  markDefs: z.array(annotationsZ).nullable().optional(),
});

export const imageBlockZ = typedObjectZ.extend({
  _type: z.literal(blockTypesZ.enum.image),
  image: sanityImageObjectExtendedZ,
});

export const richTextZ = z.array(z.union([blockZ, imageBlockZ]));

// This is the array of blocks we pass to the Sanity schema
export const blocks = blockTypes.map((type) => {
  if (type === 'block') {
    return {
      type,
      styles,
      lists,
      marks: {
        decorators,
        annotations,
      },
    };
  }
  if (type === 'image') {
    return {
      type,
      options: { hotspot: true },
    };
  }

  // TODO: Sanity's defineType helper doesn't like this return null
  return null;
});

// export some standard types for use in other files
export type BlockTypes = z.infer<typeof blockTypesZ>;
export type RichText = z.infer<typeof richTextZ>;
