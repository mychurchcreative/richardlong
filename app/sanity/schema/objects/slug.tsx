import { defineField } from 'sanity';

import { SlugInput } from '~/sanity/components/inputs/slugInput';
import { formatSlug, validateSlug } from '~/sanity/lib/helpers';

/**
 * Most common pattern for a slug field. If you need a different configuration, just replace this with your own custom field.
 * @see https://www.sanity.io/docs/slug-type
 */
export const slugField = (prefix: string) =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    description: `Use the "Generate" button to automatically populate the slug field with a semantic URL based on the title field, or manually enter your own. A good URL will tell a user (and search engine) what to expect on the page. This is another good place to inject your focus keywords.`,
    options: {
      slugify: (props) => formatSlug(props),
      source: 'title',
    },
    components: {
      input: (props) => SlugInput(props, prefix),
    },
    validation: validateSlug,
  });

export default slugField;
