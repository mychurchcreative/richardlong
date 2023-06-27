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

import { ColorSchemeToggle } from './components/colorScheme/toggle';
import CustomErrorBoundary from './components/errorBoundary/errorBoundary';
import { middleware } from './http';
import {
  ColorSchemeScript,
  useColorScheme,
} from './lib/color-scheme/components';
import { parseColorScheme } from './lib/color-scheme/server';
import { isStudioRoute } from './lib/helpers';
import tailwind from './styles/tailwind.css';

export const links: LinksFunction = () => {
  return [
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
    // { rel: 'stylesheet', href: '/fonts/nunito-sans/font.css' },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: styles },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  ].filter(Boolean);
};
export const meta: V2_MetaFunction = ({ data }) => [
  {
    charset: 'utf-8',
  },
  {
    tagName: 'link',
    rel: 'canonical',
    href: data?.settings?.general?.siteUrl,
  },
];

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

  const siteTitle = settings?.title ?? '';
  const siteUrl = settings?.siteUrl ?? '';

  return json({
    // serverState,
    colorScheme,
    isStudio,
    settings,
    siteTitle,
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
        isStudio ? '' : `min-h-full ${colorScheme === 'dark' ? 'dark' : ''}`
      }
    >
      <head>
        <title>{title}</title>
        {isStudio ? null : <ColorSchemeScript />}
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* TODO: update this with live URL */}
        <Meta />
        <Links />
        {isStudio && typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body
        className={isStudio ? '' : `min-h-screen bg-white dark:bg-slate-900`}
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
      {isStudio || production ? (
        <Outlet />
      ) : (
        <>
          <main className="mx-auto flex min-h-screen flex-col p-0 pt-16">
            <Outlet />
          </main>
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
