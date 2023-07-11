import { defineField, defineType } from 'sanity';

// import { decodeAssetUrl } from '~/sanity/lib/helpers';

// import { decodeAssetUrl } from '~/sanity/lib/helpers';

// define a type with fields using optional typed helper functions
export default defineType({
  name: 'pastorSettings',
  title: 'My Info',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          const pattern = /^\d{10}$/;
          const valid = pattern.test(value);
          return (
            valid || 'Please enter a phone number in the format: XXX-XXX-XXXX'
          );
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      description: 'A short bio to display on the homepage',
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'A photo of you to display in the header',
      options: {
        hotspot: true,
      },
      // TODO: figure out how to validate file size
      // validation: (Rule) => {
      //   return Rule.custom((field) => {
      //     if (!field?.asset) return true;

      //     const { dimensions, format } = decodeAssetUrl(field.asset._ref);
      //     console.log({ field, dimensions, format });

      //     if (dimensions.width !== 16 || dimensions.height !== 16) {
      //       return 'Photo must be a 16x16 SVG';
      //     } else {
      //       return true;
      //     }
      //   });
      // },
    }),
  ],
});
