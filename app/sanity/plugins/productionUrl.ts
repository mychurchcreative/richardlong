/**
 * This plugin sets up the "Open preview (CTRL + ALT + O)" in the dropdown menu that hosts
 * other actions like "Review changes" and "Inspect"
 */

import { definePlugin, type Slug } from 'sanity';

export const productionUrl = definePlugin<{
  types: string[];
}>(({ types: _types }) => {
  if (!_types || _types.length === 0) {
    throw new TypeError('`types` is required');
  }
  const types = new Set(_types);
  return {
    name: 'productionUrl',
    document: {
      productionUrl: async (prev, { document, getClient }) => {
        let url = `${location.origin}`;

        const slug = (document.slug as Slug)?.current;

        if (types.has(document._type)) {
          if (slug) {
            switch (document._type) {
              case 'post':
                url = `${url}/blog/${slug}`;
                break;
              default:
                url = `${url}/${slug}`;
                break;
            }
          }

          return url.toString();
        }

        return prev;
      },
    },
  };
});
