import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';

import { Container } from '~/components/container';
import { Post } from '~/components/post/post';
import { PreviewWrapper } from '~/components/preview/wrapper';
import { useRootLoaderData } from '~/lib/helpers';
import { getPostBySlug } from '~/sanity/client';
import { getPreviewToken } from '~/sanity/lib/helpers';
import { postBySlugQuery } from '~/sanity/lib/queries';

export const meta: V2_MetaFunction<typeof loader> = ({ data, params }) => {
  const { siteTitle, siteUrl } = useRootLoaderData();

  const { post } = data as { post: Post };

  // TITLE
  const seoTitle = post?.seo?.title;
  let title: string | string[] = [siteTitle];

  if (seoTitle) {
    title = [seoTitle, ...title];
  } else if (post.title) {
    title = [post.title, ...title];
  } else {
    title = ['Blog', ...title];
  }

  title = title.filter(Boolean).join(' | ');

  // ROBOTS
  const robots = post?.seo?.robots;
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
    post?.seo?.canonicalUrl ?? `${siteUrl}/blog/${params.slug}`;
  const canonical = {
    tagName: 'link',
    rel: 'canonical',
    href: canonicalHref,
  };

  // DESCRIPTION
  const description = post?.seo?.description
    ? [{ description: post.seo.description }]
    : [];

  // TODO: OG IMAGE

  const metaTags = [...robotsMeta, canonical, { title }, ...description];

  return metaTags;
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { preview } = await getPreviewToken(request);

  const { slug } = params;

  // const segment = `blog/${slug}`;

  const post = await getPostBySlug({ preview, slug });

  if (!post) {
    throw redirect(`/error/404`, 308);
  }

  return json({
    post,
    query: preview ? postBySlugQuery : null,
    params: preview ? { slug, now: new Date().toISOString() } : null,
  });
};

export default function BlogPostRoute() {
  const { post, query, params } = useLoaderData<typeof loader>();

  return (
    <PreviewWrapper
      data={post}
      render={(data) => <Post post={data} />}
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
