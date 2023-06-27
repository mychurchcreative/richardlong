import type { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';

import type { loader as rootLoader } from '~/root';
import { projectDetails } from '~/sanity/projectDetails';

export const isStudioRoute = (pathname: string) => {
  return pathname.startsWith(projectDetails().basePath);
};

export function useRootLoaderData() {
  const data = useRouteLoaderData(`root`) as SerializeFrom<typeof rootLoader>;

  return data;
}
