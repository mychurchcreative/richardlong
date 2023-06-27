import { TbArrowFork } from 'react-icons/tb';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'redirect',
  title: 'Redirects',
  type: 'object',
  icon: TbArrowFork,
  preview: {
    select: {
      from: 'from',
      to: 'to',
      permanent: 'permanent',
    },
    prepare({ from, to, permanent }) {
      return {
        title: `${from} → ${to}`,
        subtitle: permanent ? 'Permanent' : 'Temporary',
      };
    },
  },
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      description:
        'The path to redirect from (without the protocol and domain), e.g. /old-path',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect?',
      type: 'boolean',
      description:
        'If checked, this redirect will use the 308 status code, which instructs clients/search engines to cache this redirect forever. If not checked, it will use the 307 status code, which is temporary and is not cached.',
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),
  ],
});
