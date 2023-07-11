import type { SchemaTypeDefinition, TemplateResolver } from 'sanity';

import post from './documents/post';
import link from './objects/link';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
import portableText from './objects/portableText';
import redirect from './documents/redirect';
import pastorSettings from './singletons/pastorSettings';
import redirectSettings from './singletons/redirectSettings';
import siteSettings from './singletons/siteSettings';
import sermon from './documents/sermon';
import seo from './objects/seo';
import category from './documents/category';
import tag from './documents/tag';
import { isAdminUser } from '../lib/helpers';
import devotional from './documents/devotional';

const singletonTypes = new Set([
  'media.tag',
  siteSettings.name,
  // redirectSettings.name,
  pastorSettings.name,
]);
const schema: {
  types: SchemaTypeDefinition[];
  templates?: TemplateResolver;
} = {
  types: [
    // category,
    devotional,
    portableText,
    siteSettings,
    pastorSettings,
    post,
    sermon,
    seo,
    link,
    linkInternal,
    linkExternal,
    redirect,
    // redirectSettings,
    // tag,
  ],
  // Filter out singleton types from the global “New document” menu options
  templates: (prev, context) => {
    // Add this 'category child' template
    const categoryChild = {
      id: 'category-child',
      title: 'Category: Child',
      schemaType: 'category',
      parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],
      // This value will be passed-in from desk structure
      value: ({ parentId }: { parentId: string }) => ({
        parent: { _type: 'reference', _ref: parentId },
      }),
    };

    const { currentUser } = context;

    const excludedTypes = [...singletonTypes];

    // hide redirect type from non-admin users
    if (!isAdminUser(currentUser)) {
      excludedTypes.push('redirect');
    }

    return [
      ...prev.filter(({ schemaType }) => !excludedTypes.includes(schemaType)),
      categoryChild,
    ];
  },
};

export default schema;
export { singletonTypes };
