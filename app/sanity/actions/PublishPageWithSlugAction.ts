import { useToast } from '@sanity/ui';
import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
} from 'sanity';

import { apiVersion } from '~/sanity/projectDetails';
import type { RedirectsQuery } from '~/types/redirect';

import { redirectSettingsIdQuery, redirectsQuery } from '../lib/queries';

// TODO: need to add a delete action in a separate file to remove the redirect when the page is deleted or unpublished
// or discuss with the team if we want to do something else

export function PublishPageWithSlugAction(
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext
) {
  const PublishAction = (props: DocumentActionProps) => {
    const { draft, published } = props;
    const slug = draft?.slug as { current: string };
    const publishedSlug = published?.slug as { current: string };

    const originalResult = originalPublishAction(props);
    const client = context.getClient({ apiVersion });

    const toast = useToast();
    return {
      ...originalResult,
      onHandle: async () => {
        // check if the page has been pubslished before
        if (!publishedSlug) {
          // if not, then just delegate to original handler
          originalResult?.onHandle && originalResult.onHandle();
          return;
        }
        if (slug.current === publishedSlug?.current) {
          originalResult?.onHandle && originalResult.onHandle();
          return;
        } else {
          // slug has changed

          // check if there is a redirect for this slug change already
          const existingRedirects: RedirectsQuery = await client.fetch(
            redirectsQuery
          );
          const existingRedirect = existingRedirects?.find(
            (redirect) =>
              redirect.from === '/' + publishedSlug.current &&
              redirect.to === '/' + slug.current
          );
          if (existingRedirect) {
            // if there is, then just delegate to original handler
            originalResult?.onHandle && originalResult.onHandle();
            return;
          } else {
            // if there isn't, then create a redirect
            const id = await client.fetch(redirectSettingsIdQuery);

            const newRedirect = {
              _type: 'redirect',
              from: '/' + publishedSlug.current,
              to: '/' + slug.current,
              permanent: true,
            };

            // first, check if there is an inverse of this redirect and, if so, remove it so we don't end up with a loop
            const existingInverseRedirect = existingRedirects?.find(
              (redirect) =>
                redirect.from === '/' + slug.current &&
                redirect.to === '/' + publishedSlug.current
            );
            if (existingInverseRedirect) {
              // replace the inverse redirect

              await client
                .patch(id)
                .setIfMissing({ redirects: [] })
                .unset([`redirects[_key == "${existingInverseRedirect._key}"]`])
                .commit()
                .then(
                  async () =>
                    await client
                      .patch(id)
                      .setIfMissing({ redirects: [] })
                      .insert('after', 'redirects[-1]', [newRedirect])
                      .commit({ autoGenerateArrayKeys: true })
                      .then(
                        () =>
                          originalResult?.onHandle && originalResult.onHandle()
                      )
                )
                .catch((err: Error) => {
                  toast.push({
                    status: 'error',
                    title: err.message,
                  });
                });
            } else {
              // otherwise, just add the new redirect
              await client
                .patch(id)
                .setIfMissing({ redirects: [] })
                .insert('after', 'redirects[-1]', [newRedirect])
                .commit({
                  autoGenerateArrayKeys: true,
                })
                .then(
                  () => originalResult?.onHandle && originalResult.onHandle()
                )
                .catch((err: Error) => {
                  toast.push({
                    status: 'error',
                    title: err.message,
                  });
                });
            }
          }
        }
      },
    };
  };

  return PublishAction as DocumentActionComponent;
}
