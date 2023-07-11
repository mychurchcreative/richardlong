import { defineField } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons';
import { TextInputWithCharCount } from '~/sanity/components/inputs/TextInputWithCharCount';

export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Overrides the title of the page',
      components: {
        field: (props) => (
          <TextInputWithCharCount min={30} max={65} {...props} />
        ),
      },
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Provide a brief summary your content for search engine results pages (SERPs) and to give the user an idea of the content that exists within the page or site and how it relates to their search query.',
    }),
    // defineField({
    //   name: 'keywords',
    //   title: 'Keywords',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    //   description:
    //     'A list of keywords to help search engines categorize this page.',
    // }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description:
        "A canonical URL is the URL for the “main” version of a duplicated page, as determined by search engines like Google. By default, the canonical URL is set to the page's URL, but you can override this with any URL. You won't need to set this field explicitly in most cases.",
    }),
    defineField({
      name: 'robotsNote',
      title: 'Meta Robots',
      type: 'note',
      options: {
        icon: () => <HelpCircleIcon fontSize={24} />,
      },
      description: (
        <ul>
          <li>
            <strong>No Index</strong> - Tells search engines not to show this
            page in search results.
          </li>
          <li>
            <strong>No Follow</strong> - Tells search engines not to follow
            links on this page.
          </li>
          <li>
            <strong>No Image Index</strong> - Tells search engines not to index
            images on this page.
          </li>
          <li>
            <strong>No Archive</strong> - Tells search engines not to show a
            cached version of this page.
          </li>
        </ul>
      ),
    }),
    defineField({
      name: 'robots',
      type: 'array',
      title: ' ',
      description: 'Check all that apply.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'No Index', value: 'noindex' },
          { title: 'No Follow', value: 'nofollow' },
          { title: 'No Image Index', value: 'noimageindex' },
          { title: 'No Archive', value: 'noarchive' },
        ],
      },
    }),
  ],
};
