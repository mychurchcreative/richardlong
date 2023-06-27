// import { LinkIcon } from '@sanity/icons';
import { RiFileCopy2Line } from 'react-icons/ri';
import { defineType } from 'sanity';

import { PAGE_REFERENCES } from '~/sanity/lib/constants';

export default defineType({
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  icon: RiFileCopy2Line,
  preview: {
    select: {
      slug: 'reference.slug.current',
      title: 'reference.title',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
        media: RiFileCopy2Line,
      };
    },
  },
  fields: [
    // Reference
    {
      name: 'reference',
      type: 'reference',
      title: 'Page',
      // weak: true,
      validation: (Rule) => Rule.required(),
      to: PAGE_REFERENCES,
      options: {
        disableNew: true,
        filter: '!(_id in path("drafts.**")) && defined(slug.current)',
      },
    },
  ],
});
