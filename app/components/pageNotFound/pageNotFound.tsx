import { Link } from '@remix-run/react';
import { MdChevronRight } from 'react-icons/md';

import type { Post } from '~/types/post';

import { Prose } from '../prose';

export default function PageNotFound({ posts }: { posts?: Post[] }) {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
      <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
        <p className="text-base font-semibold leading-8 text-teal-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-teal-300 sm:mt-6 sm:text-lg sm:leading-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <Prose>
          <h2 className="text-teal-500 ">Latest Articles</h2>
        </Prose>
        <ul className="-mt-6 divide-y divide-gray-900/10 border-b border-gray-900/10 dark:divide-teal-500/50 dark:border-teal-500/50">
          {posts?.map((page, index) => (
            <li key={index} className="relative flex gap-x-6 py-6">
              <div className="flex-auto">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white md:text-base">
                  <Link to={page.slug ?? '#'} prefetch="intent">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {page.title}
                  </Link>
                </h3>
                {/* <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-teal-300">
                  {page.description}
                </p> */}
              </div>
              <div className="flex-none self-center">
                <MdChevronRight
                  className="h-5 w-5 text-gray-400 dark:text-white"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            prefetch="intent"
            to="/"
            className="text-sm font-semibold leading-6 text-teal-600"
          >
            <span aria-hidden="true" className="mr-2">
              &larr;
            </span>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
