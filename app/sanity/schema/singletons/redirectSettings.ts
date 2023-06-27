import type { Rule, ValidationContext } from 'sanity';
import { defineField } from 'sanity';

import type { Redirect } from '~/types/redirect';

export default {
  name: 'redirectSettings',
  title: 'Redirects',
  type: 'document',
  validation: (Rule: Rule) =>
    Rule.custom(
      (
        context: ValidationContext & {
          redirects: Redirect[];
        }
      ) => {
        const { redirects } = context;

        // create a map of all the redirects grouped by their 'from' value
        const lookup = redirects?.reduce((duplicates, currentItem) => {
          duplicates[currentItem.from] = ++duplicates[currentItem.from] || 0;
          return duplicates;
        }, {} as Record<string, number>);

        // return true if there are no duplicates, otherwise return an error message
        return redirects?.filter((r) => lookup[r.from]).length
          ? "Redirects can't have duplicate 'from' values."
          : true;
      }
    ),
  fields: [
    defineField({
      name: 'redirects',
      title: ' ',
      description: 'Click the "Add item" button to add a redirect.',
      type: 'array',
      of: [
        {
          type: 'redirect',
        },
      ],
    }),
  ],
};
