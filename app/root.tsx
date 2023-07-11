import { cssBundleHref } from '@remix-run/css-bundle';
import type {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import type { FunctionComponent, ReactNode } from 'react';

import { ExitPreview } from '~/components/preview/exitPreview';
import { getSiteSettings } from '~/sanity/client';
import { getPreviewToken } from '~/sanity/lib/helpers';
import styles from '~/styles/app.css';
import tailwind from '~/styles/tailwind.css';

import { ColorSchemeToggle } from './components/colorScheme/toggle';
import CustomErrorBoundary from './components/errorBoundary/errorBoundary';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { middleware } from './http';
import {
  ColorSchemeScript,
  useColorScheme,
} from './lib/color-scheme/components';
import { parseColorScheme } from './lib/color-scheme/server';
import { isStudioRoute } from './lib/helpers';

export const links: LinksFunction = () => {
  return [
    /* ICONS */
    // {
    // 	rel: 'apple-touch-icon',
    // 	sizes: '180x180',
    // 	href: '/favicons/apple-touch-icon.png',
    // },
    // {
    // 	rel: 'icon',
    // 	type: 'image/png',
    // 	sizes: '32x32',
    // 	href: '/favicons/favicon-32x32.png',
    // },
    // {
    // 	rel: 'icon',
    // 	type: 'image/png',
    // 	sizes: '16x16',
    // 	href: '/favicons/favicon-16x16.png',
    // },
    // { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.ico' },
    /* FONTS */
    // { rel: 'stylesheet', href: '/fonts/nunito-sans/font.css' },
    // {
    //   rel: 'preconnect',
    //   href: 'https://fonts.gstatic.com',
    //   crossOrigin: 'anonymous',
    // },
    // {
    //   rel: 'preconnect',
    //   href: 'https://fonts.googleapis.com',
    //   crossOrigin: 'anonymous',
    // },
    // {
    //   href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    //   rel: 'stylesheet',
    // },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: styles },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  ].filter(Boolean);
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const pathname = new URL(request.url).pathname;
  const production = process.env.NODE_ENV === 'production';

  const isStudio = isStudioRoute(pathname);

  if (!isStudio) {
    await middleware(request);
  }
  const { token, preview } = await getPreviewToken(request);

  // TODO: might want to create a single query for
  // all the settings we need (site, header, footer, etc.)
  // to reduce the number of requests and API calls
  const settings = await getSiteSettings({ preview });

  let colorScheme = await parseColorScheme(request);

  const siteTitle = settings?.title ?? 'Personal Pastor Pages';
  const tagline = settings?.tagline ?? 'Just another pastor site';
  const siteUrl = settings?.siteUrl ?? '';

  return json({
    pathname,
    colorScheme,
    isStudio,
    settings,
    siteTitle,
    tagline,
    siteUrl,
    preview,
    params: preview ? {} : null,
    // Note: This makes the token available to the client if they have an active session
    // This is useful to show live preview to unauthenticated users
    // If you would rather not, replace token with `null` and it will rely on your Studio auth
    token: preview ? token : null,
    // themePreference,
    production,
    ENV: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
      SANITY_DATASET: process.env.SANITY_DATASET,
      SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    },
  });
};

const Document: FunctionComponent<{
  title?: string;
  isStudio?: boolean;
  children: ReactNode;
}> = ({ children, title, isStudio = false }) => {
  let colorScheme = useColorScheme();

  return (
    <html
      lang="en"
      className={
        isStudio
          ? ''
          : `h-full antialiased ${colorScheme === 'dark' ? 'dark' : ''}`
      }
    >
      <head>
        {isStudio ? null : <ColorSchemeScript />}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {isStudio && typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body
        className={
          isStudio ? '' : `flex h-full flex-col bg-zinc-50 dark:bg-black`
        }
      >
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  const { ENV, settings, isStudio, preview, siteTitle, production } =
    useLoaderData<typeof loader>();

  const { gtmID } = settings ?? {};

  return (
    <Document isStudio={isStudio} title={siteTitle}>
      {isStudio ? (
        <Outlet />
      ) : (
        <>
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative">
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </>
      )}
      {preview ? <ExitPreview /> : null}
      {!isStudio ? <ScrollRestoration /> : null}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)}`,
        }}
      />
      {!isStudio && gtmID ? (
        <script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmID}');`,
          }}
        />
      ) : null}
    </Document>
  );
}

function UnknownErrorPage({ error }: { error: unknown }) {
  return (
    <Document title="Uh oh! Something went wrong.">
      {/* TODO: replace with Header component */}
      <div className="fixed right-5 top-5 z-[9999]">
        <ColorSchemeToggle />
      </div>
      <CustomErrorBoundary error={error} />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  return <UnknownErrorPage error={error} />;
}
