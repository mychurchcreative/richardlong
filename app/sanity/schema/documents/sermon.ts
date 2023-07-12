import { RiMicLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  icon: RiMicLine,
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare: ({
      title = 'Untitled',
      date = '',
    }: {
      title?: string;
      date?: string;
    }) => {
      return {
        title,
        subtitle: date ?? '',
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Sermon Title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
    }),
  ],
});
