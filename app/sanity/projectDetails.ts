declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
      SANITY_API_VERSION: string;
      SANITY_STUDIO_BASE_PATH: string;
    };
  }
}

type ProjectDetails = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  basePath: string;
};

const {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
  SANITY_STUDIO_BASE_PATH,
} = typeof document === 'undefined' ? process.env : window.ENV;

export const projectDetails = (): ProjectDetails => {
  return {
    projectId: SANITY_PROJECT_ID ?? '',
    dataset: SANITY_DATASET ?? 'production',
    apiVersion: SANITY_API_VERSION ?? `2023-05-11`,
    basePath: SANITY_STUDIO_BASE_PATH ?? `/studio`,
  };
};

export const { projectId, dataset, apiVersion, basePath } = projectDetails();

export const previewSecretId: `${string}.${string}` = 'preview.secret';

export const useCdn = false;
