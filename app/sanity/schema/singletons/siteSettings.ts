import { defineField, defineType } from 'sanity';

// import { decodeAssetUrl } from '~/sanity/lib/helpers';

// define a type with fields using optional typed helper functions
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  initialValue: {
    title: 'Company Name',
    tagline: 'Just another Sanity.io site',
    notFoundPage: 'Simple',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      // group: 'seo',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Just another Sanity.io site',
      // group: 'seo',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'The root url of the site (e.g. https://www.sanity.io)',
      // group: 'seo',
      // readOnly: true,
    }),
    defineField({
      title: 'Google Tag Manager (GTM)',
      description: 'To enable GTM enter your Container ID',
      name: 'gtmID',
      type: 'string',
    }),
  ],
});
