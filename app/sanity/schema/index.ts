import type { SchemaTypeDefinition, TemplateResolver } from 'sanity';

import { isAdminUser } from '../lib/helpers';
import devotional from './documents/devotional';
import post from './documents/post';
import redirect from './documents/redirect';
import sermon from './documents/sermon';
import link from './objects/link';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
import portableText from './objects/portableText';
import seo from './objects/seo';
import pastorSettings from './singletons/pastorSettings';
import siteSettings from './singletons/siteSettings';

const singletonTypes = new Set([
  'media.tag',
  siteSettings.name,
  pastorSettings.name,
]);
const schema: {
  types: SchemaTypeDefinition[];
  templates?: TemplateResolver;
} = {
  types: [
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
  ],
  // Filter out singleton types from the global “New document” menu options
  templates: (prev, context) => {
    const { currentUser } = context;

    const excludedTypes = [...singletonTypes];

    // hide redirect type from non-admin users
    if (!isAdminUser(currentUser)) {
      excludedTypes.push('redirect');
    }

    return [
      ...prev.filter(({ schemaType }) => !excludedTypes.includes(schemaType)),
    ];
  },
};

export default schema;
export { singletonTypes };
