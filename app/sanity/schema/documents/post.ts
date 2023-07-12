import { RiDraftLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

import { isAdminUser } from '~/sanity/lib/helpers';

import slug from '../objects/slug';
import title from '../objects/title';

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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'This is used for the meta description as well as the preview text on the devotionals page.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published On',
      description:
        'You can set this to a date in the future to schedule a post or set it to a date in the past to backdate a post. Defaults to the current date.',
      type: 'date',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
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
