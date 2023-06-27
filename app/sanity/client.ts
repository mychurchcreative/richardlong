import { createClient } from '@sanity/client';

import { projectDetails } from '~/sanity/projectDetails';
import type { Post } from '~/types/post';
import { postZ } from '~/types/post';
import type { RedirectsQuery } from '~/types/redirect';
import { redirectsZ } from '~/types/redirect';
import type { SiteSettings } from '~/types/siteSettings';

import {
  postBySlugQuery,
  postsQuery,
  redirectsQuery,
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
      console.log(data.body);
      return postZ.parse(data);
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
