import type { PortableTextComponents } from '@portabletext/react';
import { Link } from '@remix-run/react';

import { Image } from '../image';

// H1 is reserved for the page title, so we don't need to account for it here.
export const RichTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      return (
        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 mb-6">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return <h3 className="text-2xl font-bold mb-2">{children}</h3>;
    },
    normal: ({ children }) => {
      return <p className="mt-6">{children}</p>;
    },
    // add more block-level components here.
  },

  list: {
    bullet: ({ children }) => {
      return <ul className="mt-8 space-y-8 text-gray-600">{children}</ul>;
    },
    number: ({ children }) => {
      return <ol className="list-decimal">{children}</ol>;
    },
  },
  marks: {
    link: ({ value, children }) => {
      return (
        <Link to={value.href} className="text-indigo-500 hover:underline">
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const { asset, hotspot, crop } = value.image;
      return (
        <Image
          id={asset._id ?? ''}
          width={asset.metadata?.dimensions?.width ?? undefined}
          height={asset.metadata?.dimensions?.height ?? undefined}
          mode="cover"
          hotspot={hotspot}
          crop={crop}
          preview={asset.metadata?.lqip ?? ''}
          alt={asset.altText ?? ''}
          className={`object-cover w-full h-full my-8 rounded-lg shadow-md`}
          sizes={`min-width: ${asset.metadata?.dimensions.width}px) ${asset.metadata?.dimensions.width}px, 100vw`}
        />
      );
    },
  },
};
