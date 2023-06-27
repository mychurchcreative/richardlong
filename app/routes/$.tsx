import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { PageNotFound } from '~/components/pageNotFound';
import { getPreviewToken } from '~/sanity/lib/helpers';

export async function loader({ params, request }: LoaderArgs) {
  const { preview } = await getPreviewToken(request);

  const is404 = params['*'] === 'error/404' ? true : false;

  // TODO: This is a hack. I'm not sure how to handle this yet.
  // Right now, we only end up on this route when we are redirected to
  // /error/404 from $slug.tsx. However, you can still go to /any/non/route
  // (three segments or more) and end up here. So, if a user gets to this route
  // by navigating to any erroneous path, we want to redirect them to /error/404,
  // which will redirect them back to this splat route and then we'll show the 404 page.
  // The /error/404 slug is completely arbitrary. It could be anything, but I think
  // it makes sense to have it be /error/404.
  // We're also using this splat route so that we can query sanity for the 404 page template,
  // which we cannot do in the error boundary in root.tsx.
  if (!is404) {
    throw redirect(`/error/404`, 308);
  }

  return json(
    {
      preview,
      query: null,
      params: null,
    },
    { status: 404 }
  );
}
export default function SplatRoute() {
  return <PageNotFound />;
}
