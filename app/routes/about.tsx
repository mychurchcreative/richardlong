import { LoaderArgs, V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { Image } from '~/components/image';
import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TwitterIcon,
} from '~/components/social';
import { SocialLink } from '~/components/social/socialLink';
import { useRootLoaderData } from '~/lib/helpers';
import { loader } from '~/root';

export const meta: V2_MetaFunction<typeof loader> = ({ params, data }) => {
  const { siteTitle } = useRootLoaderData();

  const title = ['About', siteTitle].filter(Boolean).join(' | ');
  return [
    {
      // TODO: will eventually need to pull from a canonical url field in case the slug changes
      // tagName: 'link',
      // rel: 'canonical',
      // href: `${siteUrl}/blog/${params.slug}`,
      title,
      // <meta
      //     name="description"
      //     content="I’m Spencer Sharp. I live in New York City, where I design the future."
      //   />
    },
  ];
};

// export const loader = async ({ request }: LoaderArgs) => {
//   //   const { preview } = await getPreviewToken(request);
// //   const { settings } = useRootLoaderData();
// //   const { pastor } = settings ?? {};
// //   return json({ pastor });
// };

const AboutRoute = () => {
  const { settings } = useRootLoaderData();
  const { pastor } = settings ?? {};

  const image = pastor?.profileImage ?? pastor?.image;

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {image?.asset ? (
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                id={image.asset._id}
                alt={image.asset.altText ?? 'Callout image'}
                // width={128}
                // height={128}
                crop={image.crop}
                // queryParams={{ fit: 'crop', w: 128, h: 128 }}
                hotspot={image.hotspot}
                preview={image.asset.metadata?.lqip ?? ''}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
          </div>
        ) : null}
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Richard H. J. Long
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Hello, I am Richard H. J. Long from Johnson City, TN. I am a
              disciple of Jesus Christ, the Son of God. I actually became a true
              disciple of Jesus on March 31, 2005.
            </p>
            <p>
              “Following Jesus” is His first command to His true disciples. You
              cannot be a true Christian if you do not follow Jesus. I want to
              invite you to follow my blog and together we can “learn to live
              like Jesus Christ.”
            </p>
            <p>
              My textbook for these teachings will the Bible, the English
              Standard Bible Version.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink to="#" icon={TwitterIcon}>
              Follow on Twitter
            </SocialLink>
            <SocialLink to="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink to="#" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              to="mailto:pastor@example.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              pastor@example.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AboutRoute;
