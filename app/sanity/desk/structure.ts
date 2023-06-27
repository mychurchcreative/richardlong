import { RiEditLine, RiEyeLine, RiListSettingsLine } from 'react-icons/ri';
import { VscReferences } from 'react-icons/vsc';
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/desk';
import DocumentsPane from 'sanity-plugin-documents-pane';
import Iframe from 'sanity-plugin-iframe-pane';

import type { SanityDocumentWithSlug } from '~/sanity/desk/resolvePreviewUrl';
import { resolvePreviewUrl } from '~/sanity/desk/resolvePreviewUrl';
import { projectDetails } from '~/sanity/projectDetails';

import { singletonTypes } from '../schema';
import post from '../schema/documents/post';
import redirect from '../schema/objects/redirect';
import redirectSettings from '../schema/singletons/redirectSettings';
import siteSettings from '../schema/singletons/siteSettings';

export const structure: StructureResolver = (S) => {
  const posts = S.listItem()
    .title('Posts')
    .icon(post.icon)
    .child(S.documentTypeList(post.name).title(post.title + 's'));

  const redirects = S.listItem()
    .title(redirectSettings.title)
    .icon(redirect.icon)
    .child(
      S.defaultDocument({
        schemaType: redirectSettings.name,
        documentId: redirectSettings.name,
      })
    );

  const settings = S.listItem()
    .title('Site Settings')
    .icon(RiListSettingsLine)
    .child(
      S.defaultDocument({
        schemaType: siteSettings.name,
        documentId: siteSettings.name,
      }).title(siteSettings.title as string)
    );

  // exclude these types from the main list, we'll add them back to the sidebar manually
  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      ![...singletonTypes, post.name, 'media.tag'].includes(listItem.getId()!)
  );

  return S.list()
    .id('root')
    .title('Content')
    .items([
      posts,
      // S.divider(),
      ...defaultListItems,
      S.divider(),
      redirects,
      settings,
    ]);
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, getClient }
) => {
  const { apiVersion } = projectDetails();
  const client = getClient({ apiVersion });

  const previewView = S.view
    .component(Iframe)
    .options({
      url: (doc: SanityDocumentWithSlug) => resolvePreviewUrl(doc, client),
      reload: { button: true },
    })
    .icon(RiEyeLine)
    .title('Web Preview');

  const referencesPane = S.view
    .component(DocumentsPane)
    .options({
      query: `*[!(_id in path("drafts.**")) && references($id)]`,
      params: { id: `_id` },
    })
    .icon(VscReferences)
    .title('References');

  if ([post.name as string].includes(schemaType)) {
    return S.document().views([
      // Default form view
      S.view.form().icon(RiEditLine),
      previewView,
      referencesPane,
    ]);
  }
  return S.document().views([S.view.form()]);
};
