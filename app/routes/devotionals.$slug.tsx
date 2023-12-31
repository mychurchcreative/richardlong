import type {
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import { useLoaderData, useRouteError } from '@remix-run/react';

import { Container } from '~/components/container';
import { Devotional } from '~/components/devotional';
import { PreviewWrapper } from '~/components/preview/wrapper';
import type { loader as rootLoader } from '~/root';
import { getDevotionalBySlug } from '~/sanity/client';
import { getPreviewToken } from '~/sanity/lib/helpers';
import { devotionalBySlugQuery } from '~/sanity/lib/queries';

export const meta: V2_MetaFunction<typeof loader> = ({
  data,
  params,
  matches,
}) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined;

  const siteTitle = rootData ? rootData.data.siteTitle : '';
  const siteUrl = rootData ? rootData.data.siteUrl : '';

  const { devotional } = data as { devotional: Devotional };

  // TITLE
  const seoTitle = devotional?.seo?.title;
  let title: string | string[] = [siteTitle];

  if (seoTitle) {
    title = [seoTitle, ...title];
  } else if (devotional.title) {
    title = [devotional.title, ...title];
  } else {
    title = ['Devotional', ...title];
  }

  title = title.filter(Boolean).join(' | ');

  // ROBOTS
  const robots = devotional?.seo?.robots;
  const robotsMeta = robots?.length
    ? [
        {
          name: 'robots',
          content: robots.join(', '),
        },
      ]
    : [];

  // CANONICAL
  const canonicalHref =
    devotional?.seo?.canonicalUrl ?? `${siteUrl}/blog/${params.slug}`;
  const canonical = {
    tagName: 'link',
    rel: 'canonical',
    href: canonicalHref,
  };

  // DESCRIPTION
  const description = devotional?.seo?.description
    ? [{ description: devotional.seo.description }]
    : [];

  // TODO: OG IMAGE

  const metaTags = [...robotsMeta, canonical, { title }, ...description];

  return metaTags;
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { preview } = await getPreviewToken(request);
  const { slug } = params;

  const devotional = await getDevotionalBySlug({ preview, slug });

  if (!devotional._id) {
    throw redirect(`/error/404`, 308);
  }

  return json({
    devotional,
    query: preview ? devotionalBySlugQuery : null,
    params: preview ? { slug, now: new Date().toISOString() } : null,
  });
};

export default function DevotionalRoute() {
  const { devotional, query, params } = useLoaderData<typeof loader>();

  return (
    <PreviewWrapper
      data={devotional}
      render={(data) => <Devotional devotional={data} />}
      query={query}
      params={params}
    />
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="bg-red-100 text-red-600">{JSON.stringify(error)}</div>
    </Container>
  );
}
