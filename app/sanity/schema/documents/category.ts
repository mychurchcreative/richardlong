import { RiListUnordered } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

import { isAdminUser } from '~/sanity/lib/helpers';

import slug from '../objects/slug';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: RiListUnordered,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'category' }],
      // This ensures we cannot select other "children"
      options: {
        filter: '!defined(parent) && _id != @._id',
      },
    }),
    slug('category'),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      hidden: ({ currentUser }) => !isAdminUser(currentUser),
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'parent.title',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `– ${subtitle}` : ``,
    }),
  },
});
