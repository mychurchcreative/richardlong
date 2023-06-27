import { RiDraftLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

import slug from '../objects/slug';
import title from '../objects/title';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: RiDraftLine,
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
      const path = `/${slug.current}`;

      return {
        title,
        subtitle: slug.current ? path : '(missing slug)',
      };
    },
  },
  fields: [
    title,
    slug,
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
    {
      name: 'hidden',
      type: 'boolean',
      title: 'Hide from search engines?',
      description: 'Tell search engines not to index this page.',
      initialValue: false,
    },
  ],
});
