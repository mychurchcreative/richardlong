import type { SerializeFrom, V2_MetaFunction } from '@remix-run/node';
import { RouteMatch } from '@remix-run/react';
import { RiFacebookFill } from 'react-icons/ri';

import { Container } from '~/components/container';
import { Image } from '~/components/image';
import { Prose } from '~/components/prose';
import { MailIcon, TwitterIcon } from '~/components/social';
import { SocialLink } from '~/components/social/socialLink';
import { useRootLoaderData } from '~/lib/helpers';

import type { loader as rootLoader } from '~/root';

export const meta: V2_MetaFunction = ({ params, data, matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined;

  const siteTitle = rootData ? rootData.data.siteTitle : '';

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
  const email = pastor?.email ?? '#';

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
                className="aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-800 grayscale brightness-110 contrast-125"
              />
            </div>
          </div>
        ) : null}
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Richard H. J. Long
          </h1>
          <Prose>
            <p>
              I was born and raised in a small town called Sikeston, Missouri.
              My mother and dad, John and Ethel Long, had twelve children; six
              boys and six girls. After high school I served in the U. S. Marine
              Corps from 1966-72. I served in Vietnam in 1967-1968. After my
              time in the Marines, I attended and graduated from college and
              seminary.
            </p>
            <p>
              Afterwards I became a pastor. However for the most part of the 30
              years my spiritual life was a failure. I lived with spiritual
              doubt and sin controlling my life; I was a hypocrite and not a
              true follower of Jesus Christ.
            </p>
            <p>I had no peace with God.</p>
            <p>
              In the Fall of 2004 the LORD Jesus Christ brought me to a great
              conviction of sin that I had never been born again. The LORD Jesus
              Christ changed my life forever on March 31, 2005. That day He
              called me to repentance and salvation. For the first time in my
              life I lived at peace with God and never another day of doubt
              gripped my life.
            </p>
            <p>
              After I was born again on March 31, 2005 I became a true disciple
              of Jesus Christ and longed to know Him more and more every day of
              my life. For the first time in my life the Word of God came alive
              to me. After that day, I began a hunger for the Word of God every
              day.
            </p>
            <p>
              When I finally repented of my sins the LORD Jesus confirmed to me
              that He had called me to be a preacher. In the Fall of 2013,
              Pastor PeteTackett invited me to be on staff with him at Antioch
              Church in Johnson City, TN. I served with him for almost 10 years
              until June 4, 2023.
            </p>
            <p>
              Today I believe that LORD Jesus Christ has called me to continue
              growing as one of His disciples and to be a disciple maker. My
              added joy is in writing devotionals from my daily Bible readings
              each day.
            </p>
          </Prose>
        </div>
        <div className="lg:pl-20">
          <ul className="space-y-2">
            <SocialLink
              to="https://www.facebook.com/profile.php?id=100076390248419"
              icon={RiFacebookFill}
              target="_blank"
            >
              Follow on Facebook
            </SocialLink>
            <SocialLink
              to="https://twitter.com/richardlongsr"
              icon={TwitterIcon}
              target="_blank"
            >
              Follow on Twitter
            </SocialLink>
            {/* <SocialLink to="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink> */}
            {/* <SocialLink to="#" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink> */}
            <SocialLink
              to={`mailto:${email}`}
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              Get in Touch
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AboutRoute;
