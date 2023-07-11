import { getRedirects } from '~/sanity/client';
import type { Redirect, RedirectsQuery } from '~/types/redirect';

import { checkUrl } from './check-url';

/**
 * Super basic redirects handling with a redirects file.
 *
 * ```
 * # from   to    status
 * /cheese  /taco  302
 *
 * # very, very, very basic support for trailing splat
 * /docs/*  /api/*
 * ```
 *
 * @param request Web Fetch Request to possibly redirect
 */
export async function handleRedirects(request: Request): Promise<void> {
  const data: RedirectsQuery = await getRedirects({});
  const redirects: Redirect[] = data.reduce((redirects, next) => {
    let splat = false;
    let { _id, _type, from, to, permanent } = next;

    // super basic support for splats
    if (from.endsWith('/*')) {
      from = from.slice(0, -2);
      splat = true;
    }
    redirects.push({ _id, _type, from, to, splat, permanent });
    return redirects;
  }, [] as Redirect[]);

  let url = new URL(request.url);

  let response = await checkUrl(url.pathname, redirects);
  if (response) throw response;
}
