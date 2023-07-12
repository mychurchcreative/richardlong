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
              My mother and dad had twelve children; six boys and six girls.
              After high school I served in the U. S. Marine Corps from 1966-72.
              I served in Vietnam in 1967-1968. After my time in the Marines, I
              attended and graduated from college and seminary. From March 1972
              - August 1991 I served in ministry as a pastor and associate
              pastor. During those years I played the role that I was in,
              however my spiritual life was a failure. I lived with spiritual
              doubt and sin controlling my life; I was a hypocrite. My married
              life was a failure and I ended up divorcing my wife.
            </p>
            <p>
              My life was a roller coaster from December 1993 until March 31,
              2005. I had no peace with God. I lived in sin and with doubt being
              a Christian for most of these years. Aftering hearing a sermon
              from a SBC Evangelist about being a lost preacher, on that day I
              realized that that was my major problem; I was not really a true
              Christian. I was a lost preacher. On that day the LORD Jesus
              Christ brought me to a great conviction of sin that I had never
              been born again. The LORD Jesus Christ changed my life forever
              that day. He called me to repentance and salvation. For the first
              time in my life I lived at peace with God and never another day of
              doubt gripped my life.{' '}
            </p>
            <h3>A little bit about me.... </h3>
            <p>
              After I was born again on March 31, 2005 I became a true disciple
              of Jesus Christ and longed to know Him more and more every day of
              my life. For the first time in my life the Word of God came alive
              to me. After that day, I began a hunger for the Word of God every
              day.
            </p>
            <p>
              As a young boy while attending a mission SBC church I learned that
              God has a plan for every Christian's life. My curiosity thought
              maybe that I could be a pastor after I had seen my pastor's
              ordination certificate hanging on his office wall. However, not
              coming from a devoted Christian home, I did not know if I could
              ever serve God. I was very religious from the day that I was
              baptized as a 12 year old, but for most of my life until 2005, I
              lived like a true sinner, when not with Christian friends. I was
              good at learning how to act like a Christian and a pastor though I
              was not born again.
            </p>
            <p>
              I worked in real estate as a broker and regional manager after
              becoming a born again disciple of Jesus Christ. After ten years of
              marriage to my second wife, she was not happy with my new
              "committed Christian Life." Four years after being born again, she
              had an affair with her boss and divorced me after 15 years of
              marriage. I spent three years trying to restore our marriage. But
              she said no.
            </p>
            <p>
              I decided to return to East Tennessee in March 2011. I have a
              daughter and her family who live in Johnson City. I needed a home
              where I could emotionally and mentally heal. This became the 'balm
              in Gilead' for me. There is nothing like having a loving family to
              support you.
            </p>
            <p>
              After I returned to Johnson City, Pastor Pete Tackett heard that I
              was in town and we had coffee together and I shared with him my
              spiritual journey. He asked me to come to Antioch Church, where I
              once was the senior pastor, and share my testimony. I did this in
              June 2011 on Father's Day. This became a very important day in the
              healing of my soul from past failures as a lost pastor.
            </p>
            <p>
              Over a year later, Pastor Tackett, asked me if I would consider
              becoming a part of his ministry team. After three months of
              praying for God's will I wondered if God could use me in ministry.
              After all, I had been divorced two times. Then I remembered Jesus
              Christ saved me and forgave me of all my sins. Since January 2013,
              the Antioch Church and God have allowed me to serve in the gospel
              ministry as an Associate Pastor with preaching and teaching
              responsibilities, as well as overseeing the prayer and pastoral
              care ministry at Antioch Church. I retired from ministry at
              Antioch Church on June 4, 2023.
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
