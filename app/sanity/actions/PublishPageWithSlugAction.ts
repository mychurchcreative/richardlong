import { useToast } from '@sanity/ui';
import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
} from 'sanity';

import { apiVersion } from '~/sanity/projectDetails';
import type { RedirectsQuery } from '~/types/redirect';

import { redirectsQuery } from '../lib/queries';

// TODO: need to add a delete action in a separate file to remove the redirect when the page is deleted or unpublished
// or discuss with the team if we want to do something else

export function PublishPageWithSlugAction(
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext
) {
  const PublishAction = (props: DocumentActionProps) => {
    const { draft, published, type } = props;
    const draftSlug = draft?.slug as { current: string };
    const publishedSlug = published?.slug as { current: string };

    let prefix = '';
    switch (type) {
      case 'post':
        prefix = 'blog';
        break;
      case 'page':
        break;
      default:
        break;
    }

    const oldSlug = `${prefix}/${publishedSlug?.current}`;
    const newSlug = `${prefix}/${draftSlug?.current}`;

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
        // check if slug hasn't changed
        if (draftSlug.current === publishedSlug?.current) {
          originalResult?.onHandle && originalResult.onHandle();
          return;
        } else {
          // slug has changed, so we need to create a redirect

          // get the existing list of redirects
          const existingRedirects: RedirectsQuery = await client.fetch(
            redirectsQuery
          );
          // check if there is a redirect for this slug change already
          const existingRedirect = existingRedirects?.find(
            (redirect) =>
              redirect.from === '/' + oldSlug && redirect.to === '/' + newSlug
          );
          if (existingRedirect) {
            // if there is, then just delegate to original handler
            originalResult?.onHandle && originalResult.onHandle();
            return;
          } else {
            // if there isn't, then create a redirect

            const newRedirect = {
              _type: 'redirect',
              from: '/' + oldSlug,
              to: '/' + newSlug,
              permanent: true,
            };

            // first, check if there is an inverse of this redirect and, if so, remove it so we don't end up with a loop
            const existingInverseRedirect = existingRedirects?.find(
              (redirect) =>
                redirect.from === '/' + newSlug && redirect.to === '/' + oldSlug
            );
            if (existingInverseRedirect) {
              // delete the inverse redirect

              await client
                .delete(existingInverseRedirect._id)
                .then(() => {})
                .catch((err: Error) => {
                  toast.push({
                    status: 'error',
                    title: err.message,
                  });
                });
            } else {
              // otherwise, just add the new redirect
              await client
                .create(newRedirect)
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
