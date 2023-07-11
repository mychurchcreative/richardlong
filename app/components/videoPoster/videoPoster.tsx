import { SanityImageObjectExtended } from '~/types/image';
import { Image } from '../image';
import { Link } from '@remix-run/react';

export const VideoPoster = ({
  poster,
  slug,
}: {
  slug: string;
  poster: SanityImageObjectExtended;
}) => {
  if (!poster.asset) {
    return null;
  }
  return (
    <Link
      to={`https://www.youtube-nocookie.com/embed/${slug}`}
      target="_blank"
      className="relative"
    >
      <Image
        id={poster.asset._id}
        alt={poster.asset.altText ?? ''}
        width={1920}
        height={1080}
        crop={poster.crop}
        queryParams={{ fit: 'center', w: 1920, h: 1080 }}
        hotspot={poster.hotspot}
        preview={poster.asset.metadata?.lqip ?? ''}
        className="rounded-lg"
        //   sizes={large ? '4rem' : '2.25rem'}
        //   className={twMerge(
        //     'rounded-full bg-zinc-100 dark:bg-zinc-800',
        //     large ? 'h-16 w-16' : 'h-9 w-9'
        //   )}
      />
      <div className="h-16 bg-black/50 backdrop-blur absolute bottom-0 left-0 w-full text-zinc-400 p-4 flex items-center rounded-b-lg">
        Watch Sermon
      </div>
    </Link>
  );
};
