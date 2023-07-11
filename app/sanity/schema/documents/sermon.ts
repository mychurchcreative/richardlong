import { defineField, defineType } from 'sanity';
import { RiMicLine } from 'react-icons/ri';

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
      name: 'keyText',
      title: 'Key Text',
      type: 'string',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      description: 'It should look something like "fJeNqnekQJQ"',
      type: 'string',
    }),
  ],
});
