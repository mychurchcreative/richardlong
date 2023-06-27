import { EarthGlobeIcon } from '@sanity/icons';
import { defineField } from 'sanity';

export default defineField({
  title: 'External Link',
  name: 'linkExternal',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    // URL
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    // Open in a new window
    {
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const { url } = selection;

      let subtitle = [];
      if (url) {
        subtitle.push(`→ ${url}`);
      }
      return {
        media: EarthGlobeIcon,
        title: subtitle.join(' '),
      };
    },
  },
});
