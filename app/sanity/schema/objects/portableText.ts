import { blocks } from '~/types/richText';

// TODO: defineType causes a TypeError when used with the blocks array
export default {
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: blocks,
};
