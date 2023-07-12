import { visionTool } from '@sanity/vision';
import { defineConfig, isDev } from 'sanity';
import { deskTool } from 'sanity/desk';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { media } from 'sanity-plugin-media';
import { noteField } from 'sanity-plugin-note-field';

import { PublishPageWithSlugAction } from '~/sanity/actions/PublishPageWithSlugAction';
import StudioNavBar from '~/sanity/components/studio/StudioNavBar';
import { defaultDocumentNode, structure } from '~/sanity/desk/structure';
import {
  PAGE_REFERENCES,
  PREVIEWABLE_DOCUMENT_TYPES,
} from '~/sanity/lib/constants';
import { productionUrl } from '~/sanity/plugins/productionUrl';
import { projectDetails } from '~/sanity/projectDetails';
import schema, { singletonTypes } from '~/sanity/schema';
import { tags } from 'sanity-plugin-tags';
import { titleCase } from '~/lib/utils/helpers';

const devOnlyPlugins = [visionTool()];

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export const config = defineConfig({
  ...projectDetails(),
  name: 'production',
  title: titleCase(projectDetails().dataset),
  // TODO: filter out settings and redirects for client
  plugins: [
    deskTool({ structure, defaultDocumentNode }),
    media(),
    ...(isDev ? devOnlyPlugins : []),
    unsplashImageAsset(),
    noteField(),
    productionUrl({
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    tags({}),
  ],
  schema,
  document: {
    actions: (prev, context) => {
      return singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : PAGE_REFERENCES.find(({ type }) => type === context.schemaType)
        ? prev.map((originalAction) =>
            originalAction.action === 'publish'
              ? PublishPageWithSlugAction(originalAction, context)
              : originalAction
          )
        : prev;
    },
  },
  studio: {
    components: {
      navbar: StudioNavBar,
    },
  },
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some(
      (role) => role.name === 'administrator'
    );

    // If the user has the administrator role, return all tools.
    // If the user does not have the administrator role, filter out the vision tool.
    return isAdmin ? prev : prev.filter((tool) => tool.name !== 'vision');
    // return prev;
  },
});
