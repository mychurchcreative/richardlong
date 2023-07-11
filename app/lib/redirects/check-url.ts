import { redirect } from '@remix-run/node';

import type { Redirect } from '~/types/redirect';

export async function checkUrl(
  url: string,
  redirects: Redirect[]
): Promise<Response | null> {
  for (let r of redirects) {
    let { from, to, splat, permanent } = r;
    let match = splat ? url.startsWith(from) : from === url;
    if (match) {
      let location = to;
      if (to.endsWith('/*')) {
        let base = to.slice(0, -2);
        let splatPath = url.replace(from, '');
        location = base + splatPath;
      }
      if (
        !location.startsWith('/') &&
        !location.startsWith('http://') &&
        !location.startsWith('https://')
      ) {
        location = '/' + location;
      }

      return redirect(location, { status: permanent ? 308 : 307 });
    }
  }
  return null;
}
