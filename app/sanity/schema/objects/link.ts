import { HiOutlineCursorClick } from 'react-icons/hi';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  preview: {
    select: {
      title: 'link[0].title',
      slug: 'link[0].reference.slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title,
        subtitle: `/${slug}`,
        media: HiOutlineCursorClick,
      };
    },
  },
  icon: HiOutlineCursorClick,
  fields: [
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link To',
      description: 'Select a page or an external URL.',
      type: 'array',
      of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
      validation: (Rule) => Rule.max(1),
    }),
  ],
});
