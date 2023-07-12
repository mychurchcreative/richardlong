import devotional from '../schema/documents/devotional';
import post from '../schema/documents/post';

// References to include in 'internal' links
export const PAGE_REFERENCES = [{ type: post.name }, { type: devotional.name }];

// export const BLOCK_STYLES = [
//   { title: 'Normal', value: 'normal' },
//   { title: 'Heading 2', value: 'h2' },
//   { title: 'Heading 3', value: 'h3' },
//   { title: 'Heading 4', value: 'h4' },
//   { title: 'Heading 5', value: 'h5' },
//   { title: 'Heading 6', value: 'h6' },
//   { title: 'Quote', value: 'blockquote' },
// ];

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
  post.name,
  devotional.name,
];

// All available sanity schema types should be included here
// export const PAGE_BUILDER_TYPES = ['hero', 'form'] as const;

// export const pageBuilderEnumZ = z.enum(PAGE_BUILDER_TYPES);
