import { createClient } from '@sanity/client';

import { projectDetails } from '~/sanity/projectDetails';
import type { Devotional } from '~/types/devotional';
import type { Pastor } from '~/types/pastor';
import type { Post } from '~/types/post';
// import { postZ } from '~/types/post';
import type { RedirectsQuery } from '~/types/redirect';
import { redirectsZ } from '~/types/redirect';
import type { Sermon } from '~/types/sermon';
import type { SiteSettings } from '~/types/siteSettings';

import {
  devotionalBySlugQuery,
  devotionalsQuery,
  indexQuery,
  postBySlugQuery,
  postsQuery,
  redirectsQuery,
  sermonsQuery,
  siteSettingsQuery,
} from './lib/queries';

type ClientProps = {
  preview?: boolean;
};

export const client = createClient({
  ...projectDetails(),
  useCdn: true,
});

export const previewClient = createClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const getClient = (previewMode = false) =>
  previewMode ? previewClient : client;

export const writeClient = createClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function getRedirects({
  preview = false,
}: ClientProps): Promise<RedirectsQuery> {
  if (client) {
    const redirects =
      (await getClient(preview)?.fetch(redirectsQuery)) ||
      ([] as RedirectsQuery);
    return redirectsZ.parse(redirects);
  }
  return [] as RedirectsQuery;
}

// TODO: add types
export async function getSiteSettings({
  preview = false,
}: ClientProps): Promise<SiteSettings> {
  if (client) {
    return await getClient(preview).fetch(siteSettingsQuery);
  }
  return {} as SiteSettings;
}

export async function getPostBySlug({
  preview = false,
  slug,
}: ClientProps & {
  slug?: string;
}): Promise<Post> {
  // get page id and page builder types
  if (client) {
    const data: Post = await getClient(preview).fetch(postBySlugQuery, {
      slug,
    });
    if (data) {
      // console.log(data.body);
      // return postZ.parse(data);
      // console.log(data.body);
      return data;
    }
  }

  return {} as Post;
}

export async function getPosts({
  preview = false,
}: ClientProps): Promise<Post[]> {
  if (client) {
    const data: Post[] = await getClient(preview).fetch(postsQuery);
    return data;
  }

  return [] as Post[];
}

export async function getDevotionalBySlug({
  preview = false,
  slug,
}: ClientProps & {
  slug?: string;
}): Promise<Devotional> {
  if (client) {
    const data: Devotional = await getClient(preview).fetch(
      devotionalBySlugQuery,
      {
        slug,
        now: new Date().toISOString(),
      }
    );
    if (data) {
      // console.log(data.body);
      // return postZ.parse(data);
      // console.log(data.body);
      return data;
    }
  }

  return {} as Devotional;
}

export async function getDevotionals({
  preview = false,
}: ClientProps): Promise<Devotional[]> {
  if (client) {
    const data: Devotional[] = await getClient(preview).fetch(
      devotionalsQuery,
      {
        now: new Date().toISOString(),
      }
    );
    return data;
  }

  return [] as Devotional[];
}

export async function getSermons({
  preview = false,
}: ClientProps): Promise<Sermon[]> {
  if (client) {
    const data: Sermon[] = await getClient(preview).fetch(sermonsQuery);
    return data;
  }

  return [] as Sermon[];
}

type IndexQuery = {
  posts: Post[];
  pastor: Pastor;
  sermons: Sermon[];
};
export async function getIndexQuery({
  preview = false,
}: ClientProps): Promise<IndexQuery> {
  if (client) {
    const data = await getClient(preview).fetch(indexQuery);
    return data;
  }

  return {} as IndexQuery;
}
