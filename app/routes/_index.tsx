import type {
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import { Card } from '~/components/card';
import { Container } from '~/components/container';
import { Prose } from '~/components/prose';
import { formatDate } from '~/lib/utils/helpers';
import type { loader as rootLoader } from '~/root';
import { getIndexQuery } from '~/sanity/client';

export const meta: V2_MetaFunction = ({ matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined;

  const rootTitle = rootData ? rootData.data.siteTitle : '';
  const tagline = rootData ? rootData.data.tagline : '';

  const title = [rootTitle, tagline].filter(Boolean).join(' | ');
  return [
    { title },
    {
      tagName: 'link',
      rel: 'canonical',
      href: rootData?.data.siteUrl,
    },
  ];
};
export const loader = async ({ request }: LoaderArgs) => {
  const { posts, pastor, sermons } = await getIndexQuery({});

  return json({
    posts,
    pastor,
    sermons,
  });
};

export default function Index() {
  const { posts, pastor, sermons } = useLoaderData<typeof loader>();

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Richard Long, a disciple of Jesus Christ!
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {pastor?.bio}
          </p>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-10 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <Prose className="border-b border-zinc-100 dark:border-zinc-700/40">
              <h2>Recent Articles</h2>
            </Prose>
            {posts.length ? (
              posts.map((article) => (
                <Card as="article" key={article._id}>
                  <Card.Title href={`/blog/${article.slug}`}>
                    {article.title}
                  </Card.Title>
                  <Card.Eyebrow
                    as="time"
                    dateTime={article.publishedAt}
                    decorate
                  >
                    {formatDate(article.publishedAt)}
                  </Card.Eyebrow>
                  {/* TODO: add meta description or summary field */}
                  {article.excerpt ? (
                    <Card.Description>{article.excerpt}</Card.Description>
                  ) : null}
                  <Card.Cta>Read article</Card.Cta>
                </Card>
              ))
            ) : (
              <Prose>
                <p>Nothing yet.</p>
              </Prose>
            )}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Prose className="border-b border-zinc-100 dark:border-zinc-700/40">
              <h2>Sermons</h2>
            </Prose>
            {sermons.length ? (
              sermons.map((sermon) => (
                <Card as="article" key={sermon._id}>
                  <Card.Title href={sermon.videoUrl} openInNewTab>
                    {sermon.title}
                  </Card.Title>
                  {sermon.date ? (
                    <Card.Eyebrow as="time" dateTime={sermon.date} decorate>
                      {formatDate(sermon.date)}
                    </Card.Eyebrow>
                  ) : null}
                  <Card.Cta>Watch sermon</Card.Cta>
                </Card>
              ))
            ) : (
              <Prose>
                <p>Nothing yet.</p>
              </Prose>
            )}
            {/* <Newsletter />
            <Resume /> */}
          </div>
        </div>
      </Container>
    </>
  );
}
