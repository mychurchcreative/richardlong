import { formatDate } from '~/lib/utils/helpers';
import { Devotional } from '~/types/devotional';

import { Container } from '../container';
import { Prose } from '../prose';
import { RichText } from '../richText';

const Devotional = ({ devotional }: { devotional: Devotional }) => {
  const { title, body, featuredImage, publishedAt } = devotional ?? {};

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {title}
              </h1>
              <time
                dateTime={publishedAt}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(publishedAt)}</span>
              </time>
            </header>
            <Prose className="mt-8">
              {body ? <RichText richText={body} /> : null}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  );
};

export { Devotional };

export function ErrorBoundary() {
  return <div>Oops!</div>;
}
