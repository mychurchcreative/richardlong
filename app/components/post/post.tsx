import { Post } from '~/types/post';

import { RichText } from '../richText';
import { Image } from '../image';

const Post = ({ data }: { data: Post }) => {
  const { title, body, featuredImage } = data;

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        {featuredImage?.asset ? (
          <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
            <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
              <Image
                id={featuredImage.asset._id ?? ''}
                width={
                  featuredImage.asset.metadata?.dimensions?.width ?? undefined
                }
                height={
                  featuredImage.asset.metadata?.dimensions?.height ?? undefined
                }
                mode="cover"
                hotspot={featuredImage.hotspot}
                crop={featuredImage.crop}
                preview={featuredImage.asset.metadata?.lqip ?? ''}
                alt={featuredImage.asset.altText ?? ''}
                className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
                sizes={`min-width: ${featuredImage.asset.metadata?.dimensions.width}px) ${featuredImage.asset.metadata?.dimensions.width}px, 100vw`}
              />
            </div>
          </div>
        ) : null}
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            {/* TODO: This is like a category or something */}
            {/* <p className="text-base font-semibold leading-7 text-indigo-600">
              Deploy faster
            </p> */}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
            {/* TODO: this is maybe an excerpt or teaser field */}
            {/* <p className="mt-6 text-xl leading-8 text-gray-700">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem.
              At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at
              vitae feugiat egestas ac. Diam nulla orci at in viverra
              scelerisque eget. Eleifend egestas fringilla sapien.
            </p> */}
            {/* yeah because this is the body of the article here... */}

            {body ? (
              <div className="mt-10 max-w-xl text-base leading-7 text-gray-700 lg:max-w-none">
                <RichText richText={body} />{' '}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Post };

export function ErrorBoundary() {
  return <div>Oops!</div>;
}
