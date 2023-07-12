import type {
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import { Prose } from '~/components/prose';
import type { loader as rootLoader } from '~/root';
import { getSermons } from '~/sanity/client';
import { Sermon } from '~/types/sermon';

import { Card } from '../components/card';
import { SimpleLayout } from '../components/layout/simple';
import { formatDate } from '../lib/utils/helpers';

export const meta: V2_MetaFunction = ({ matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined;

  const siteTitle = rootData ? rootData.data.siteTitle : '';

  const title = ['Sermons', siteTitle].filter(Boolean).join(' | ');

  return [{ title }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const sermons = await getSermons({});

  return json({
    sermons,
  });
};

function Sermon({ sermon }: { sermon: Sermon }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={sermon.videoUrl} openInNewTab>
          {sermon.title}
        </Card.Title>
        {sermon.date ? (
          <Card.Eyebrow
            as="time"
            dateTime={sermon.date}
            className="md:hidden"
            decorate
          >
            {formatDate(sermon.date)}
          </Card.Eyebrow>
        ) : null}
        <Card.Cta>Watch sermon</Card.Cta>
      </Card>
      {sermon.date ? (
        <Card.Eyebrow
          as="time"
          dateTime={sermon.date}
          className="mt-1 hidden md:block"
        >
          {formatDate(sermon.date)}
        </Card.Eyebrow>
      ) : null}
    </article>
  );
}

export default function SermonIndex() {
  const { sermons } = useLoaderData<typeof loader>();
  return (
    <>
      <SimpleLayout
        title="Sermons"
        // intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget neque egestas, iaculis dui vel, eleifend orci. Nam vitae felis interdum, rhoncus mi at, mattis neque. Fusce nisl turpis, sodales non efficitur quis, mollis et urna."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {sermons.length ? (
              sermons.map((sermon) => (
                <Sermon key={sermon._id} sermon={sermon} />
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
