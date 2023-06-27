import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';

import { Post } from '~/components/post/post';
import { PreviewWrapper } from '~/components/preview/wrapper';
import { useRootLoaderData } from '~/lib/helpers';
import { getPostBySlug } from '~/sanity/client';
import { getPreviewToken } from '~/sanity/lib/helpers';
import { postBySlugQuery } from '~/sanity/lib/queries';

// export const meta: V2_MetaFunction<typeof loader> = ({ params, data }) => {
//   const { siteUrl } = useRootLoaderData();
//   return [
//     {
//       // TODO: will eventually need to pull from a canonical url field in case the slug changes
//       tagName: 'link',
//       rel: 'canonical',
//       href: `${siteUrl}/blog/${params.slug}`,
//     },
//   ];
// };

export const loader = async ({ params, request }: LoaderArgs) => {
  const { preview } = await getPreviewToken(request);
  const { slug } = params;
  const data = await getPostBySlug({ preview, slug });

  console.log({ data });

  if (!data) {
    // if no data was found for this slug, redirect to the splat route ($.tsx)
    throw redirect(`/error/404`, 308);
  }

  return json({
    data,
    query: preview ? postBySlugQuery : null,
    params: preview ? { slug } : null,
  });
};

export default function BlogPostRoute() {
  const { data, query, params } = useLoaderData<typeof loader>();

  return (
    <PreviewWrapper
      data={data}
      render={(data) => <Post data={data} />}
      query={query}
      params={params}
    />
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);
  return <div className="bg-red-100 text-red-600">{JSON.stringify(error)}</div>;
}
