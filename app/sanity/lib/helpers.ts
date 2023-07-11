// https://github.com/sanity-io/sanity/blob/9a00bd2fb01ee4ed8b9b1a6b856fc25d728fd222/packages/@sanity/cli/templates/shopify/utils/validateSlug.ts
import type { CurrentUser, SlugRule } from 'sanity';
import slug from 'slug';

import { getSession } from '~/sessions';

const MAX_LENGTH = 96;

export const validateSlug = (rule: SlugRule) => {
  return rule.required().custom((value) => {
    const currentSlug = value && value.current;
    if (!currentSlug) {
      return true;
    }

    if (currentSlug.length >= MAX_LENGTH) {
      return `Must be less than ${MAX_LENGTH} characters`;
    }

    return true;
  });
};

export const formatSlug = (input: string) => {
  const formattedSlug = slug(input, { multicharmap: { '@': 'a' } });

  return formattedSlug;
};

export const decodeAssetUrl = (id: string) => {
  const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/;
  const [, assetId, dimensions, format] = pattern.exec(id) || [];

  const [width, height] = dimensions
    ? dimensions.split('x').map((v) => parseInt(v, 10))
    : [];

  return {
    assetId,
    dimensions: { width, height },
    format,
  };
};

export async function getPreviewToken(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  return {
    preview: !!token,
    token: token ? String(token) : null,
  };
}

export function isAdminUser(user: Omit<CurrentUser, 'role'> | null) {
  return !!user?.roles.find(({ name }) => name === 'administrator');
}
