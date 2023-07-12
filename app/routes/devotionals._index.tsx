import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Card } from '../components/card';
import { SimpleLayout } from '../components/layout/simple';
import { formatDate } from '../lib/utils/helpers';
import { useRootLoaderData } from '~/lib/helpers';
import { getDevotionals } from '~/sanity/client';
import { Devotional } from '~/types/devotional';
import { Prose } from '~/components/prose';

export const meta: V2_MetaFunction = ({ matches }) => {
  const { siteTitle } = useRootLoaderData();

  const title = ['Devotionals', siteTitle].filter(Boolean).join(' | ');

  return [{ title }];
};

//  TODO: meta description, canonical url, etc.

export const loader = async ({ request }: LoaderArgs) => {
  const devotionals = await getDevotionals({});

  return json({
    devotionals,
  });
};

function Article({ article }: { article: Devotional }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(article.publishedAt)}
        </Card.Eyebrow>
        {article.seo?.description ? (
          <Card.Description>{article.seo?.description}</Card.Description>
        ) : null}
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.publishedAt}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.publishedAt)}
      </Card.Eyebrow>
    </article>
  );
}

export default function DevotionalsIndex() {
  const { devotionals } = useLoaderData<typeof loader>();
  return (
    <>
      <SimpleLayout
        title="Devotionals"
        intro={`"Following Jesus" is His first command to His true disciples. You cannot be a true Christian if you do not follow Jesus. I want to invite you to follow my blog and together we can "learn to live like Jesus Christ."`}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {devotionals.length ? (
              devotionals.map((article) => (
                <Article key={article.slug} article={article} />
              ))
            ) : (
              <Prose>
                <p>Nothing yet.</p>
              </Prose>
            )}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
