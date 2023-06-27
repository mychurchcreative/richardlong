import { ensureSecure } from '~/lib/http/ensure-secure';
import { removeTrailingSlashes } from '~/lib/http/remove-slashes';
import { handleRedirects } from '~/lib/redirects';

import { cleanWindshield } from './lib/http/clean-windshield';

export const CACHE_CONTROL = {
  /**
   * Keep it in the browser (and CDN) for 5 minutes so when they click
   * back/forward/etc.  It's super fast, swr for 1 week on CDN so it stays fast
   * but people get typos fixes and stuff, too.
   */
  doc: 'max-age=300, stale-while-revalidate=604800',
};

export async function middleware(request: Request): Promise<void> {
  await ensureSecure(request);
  await removeTrailingSlashes(request);
  await cleanWindshield(request);
  await handleRedirects(request);
}
