import { SanityImage } from 'sanity-image';

import { dataset, projectId } from '~/sanity/projectDetails';

const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;

const Image = (
  props: { id: string } & Omit<
    React.ComponentProps<typeof SanityImage>,
    'baseUrl' | 'dataset' | 'projectId'
  >
) => <SanityImage baseUrl={baseUrl} {...props} />;

export default Image;
