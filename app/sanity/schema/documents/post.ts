import { RiDraftLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

import slug from '../objects/slug';
import title from '../objects/title';
import { isAdminUser } from '~/sanity/lib/helpers';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: RiDraftLine,
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare: ({
      title = 'Untitled',
      slug = { current: '' },
    }: {
      title?: string;
      slug?: { current: string };
    }) => {
      const path = `blog/${slug.current}`;

      return {
        title,
        subtitle: slug.current ? path : '(missing slug)',
      };
    },
  },
  fields: [
    title,
    slug('blog'),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            'Important for SEO and accessiblity. Leave blank if alt text exists on the asset in the Media Library.',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      hidden: ({ currentUser }) => !isAdminUser(currentUser),
    }),
  ],
});
