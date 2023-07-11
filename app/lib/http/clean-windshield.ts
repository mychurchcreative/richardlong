import { redirect } from '@remix-run/node';

export async function cleanWindshield(request: Request) {
  let url = new URL(request.url);
  const { pathname } = url;

  const segment = '/error/404';

  if (pathname.startsWith(segment) && pathname !== segment) {
    console.log('cleaning windshield');
    throw redirect(url.pathname.slice(0, segment.length) + url.search);
  }
}
