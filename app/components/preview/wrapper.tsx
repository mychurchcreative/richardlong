import type { Params } from '@sanity/preview-kit';
import { definePreview, PreviewSuspense } from '@sanity/preview-kit';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';

// import { Loading } from '~/components/Loading';
import { useRootLoaderData } from '~/lib/helpers';
import { projectDetails } from '~/sanity/projectDetails';

import Spinner from '../spinner/spinner';

const { projectId, dataset } = projectDetails();
const usePreview = definePreview({ projectId, dataset });

// T default to any
type PreviewWrapperProps<T> = {
  data: T;
  render: (data: T) => ReactNode;
  query: string | null;
  params: Params | null;
  fallback?: ReactNode;
};

// Suspense boundary prevents usePreview from running on the server
// Component just renders children if preview mode is not enabled
export function PreviewWrapper<T>(props: PreviewWrapperProps<T>) {
  const {
    // Given this data OR if preview is active, draft data
    data,
    // Render this component using the data
    render,
    // If preview mode is active, listen to this query
    query = null,
    // With these params
    params = {},
    // And fallback to this while loading
    fallback = <Spinner />,
  } = props;
  const { preview, token } = useRootLoaderData();

  if (!preview || !query) {
    const Component = render(data);

    return Component && isValidElement(Component) ? Component : null;
  }

  return (
    <PreviewSuspense fallback={fallback}>
      <PreviewSuspended<typeof data>
        query={query}
        render={render}
        params={params ?? {}}
        token={token}
      />
    </PreviewSuspense>
  );
}

// TODO: add types
type PreviewSuspendedProps<T = any> = {
  render: (previewData: T) => ReactNode;
  query: string;
  params: Params;
  token: string | null;
};

// Browser-only preview component
// TODO: add types
function PreviewSuspended<T = any>(props: PreviewSuspendedProps<T>) {
  const { query, params = {}, token = null, render } = props;
  // console.log("PreviewSuspended", { query, params, token })
  // A `null` token with rely on your Studio's auth in the same browser session
  const previewData = usePreview(token, query, params);
  // console.log("previewData", previewData);
  const Component = render(previewData);

  return Component && isValidElement(Component) ? Component : null;
}
