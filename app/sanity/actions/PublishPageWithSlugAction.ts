import { useToast } from '@sanity/ui';
import {
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionProps,
  type DocumentActionsContext,
} from 'sanity';

import { apiVersion } from '~/sanity/projectDetails';
import type { RedirectsQuery } from '~/types/redirect';

import { redirectsQuery } from '../lib/queries';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

// TODO: need to add a delete action in a separate file to remove the redirect when the page is deleted or unpublished
// or discuss with the team if we want to do something else. Either way, it's going to return a 404 when trying to view the page.

export function PublishPageWithSlugAction(
  originalPublishAction: DocumentActionComponent,
  context: DocumentActionsContext
) {
  const PublishAction = (props: DocumentActionProps) => {
    const { id, draft, published, type } = props;

    const publishedAt = draft?.publishedAt;
    const draftSlug = draft?.slug as { current: string };
    const publishedSlug = published?.slug as { current: string };

    const { patch, publish } = useDocumentOperation(id, type);
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
      // if the isPublishing state was set to true and the draft has changed
      // to become `null` the document has been published
      if (isPublishing && !draft) {
        setIsPublishing(false);
      }
    }, [draft]);

    let prefix = '';
    switch (type) {
      case 'post':
        prefix = 'blog';
        break;
      case 'devotional':
        prefix = 'devotionals';
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
      disabled: publish.disabled || isPublishing,
      label: isPublishing
        ? 'Publishing…'
        : publishedSlug
        ? 'Update'
        : 'Publish',
      onHandle: async () => {
        // check if the page has been published before
        if (!publishedSlug) {
          // if not, then just delegate to original handler
          originalResult?.onHandle &&
            (await handleOriginalResult(originalResult.onHandle));
          return;
        }
        // check if slug hasn't changed
        if (draftSlug.current === publishedSlug?.current) {
          originalResult?.onHandle &&
            (await handleOriginalResult(originalResult.onHandle));
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
            originalResult?.onHandle &&
              (await handleOriginalResult(originalResult.onHandle));
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
                  async () =>
                    originalResult?.onHandle &&
                    (await handleOriginalResult(originalResult.onHandle))
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

    async function handleOriginalResult(fn: () => void) {
      // This will update the button text
      setIsPublishing(true);

      // check if the user has set a publishedAt date
      if (!publishedAt) {
        console.log('no publishedAt date');
        // if not, set publishedAt to current date and time
        patch.execute([
          { set: { publishedAt: dayjs(new Date()).format('YYYY-MM-DD') } },
        ]);

        // Perform the publish
        publish.execute();

        // Signal that the action is completed
        props.onComplete();
        // if there is no publishedAt date, set it to now
        // const now = new Date().toISOString();
        // await client
        //   .patch(id)
        //   .setIfMissing({ publishedAt: now })
        //   .commit()
        //   .then(() => fn())
        //   .catch((err: Error) => {
        //     toast.push({
        //       status: 'error',
        //       title: err.message,
        //     });
        //   });
        // // return;
      }
      fn();
    }
  };

  return PublishAction as DocumentActionComponent;
}
