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
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {pastor?.image?.asset ? (
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                id={pastor.image.asset._id}
                alt={pastor.image.asset.altText ?? 'Callout image'}
                // width={128}
                // height={128}
                crop={pastor.image.crop}
                // queryParams={{ fit: 'crop', w: 128, h: 128 }}
                hotspot={pastor.image.hotspot}
                preview={pastor.image.asset.metadata?.lqip ?? ''}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
          </div>
        ) : null}
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I’m Pastor John. I live in New York City, where lorem ipsum dolor
            sit amet.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
              mauris blandit, molestie ipsum eget, condimentum justo. Integer
              lacus eros, blandit ut eleifend non, ornare sit amet sem. Nullam
              consectetur metus ac quam egestas, quis venenatis elit mattis. In
              ut nisi enim. Integer varius semper justo, sed venenatis urna
              pellentesque sit amet. Cras pretium placerat odio, vitae tempor
              velit congue sed. Duis sed augue diam.
            </p>
            <p>
              Mauris aliquet quam nec scelerisque rutrum. Nunc vehicula egestas
              varius. Nam sed nisl urna. Praesent ut ligula maximus, varius urna
              non, sodales libero. Donec a metus tortor. Donec varius vestibulum
              purus id dictum. In aliquam tempus mi, a aliquam lorem maximus
              nec. Etiam quis lectus a nisl sodales dapibus quis eget libero.
              Suspendisse id hendrerit odio, sit amet rutrum sem. Mauris
              venenatis nunc sit amet pretium tincidunt. Aliquam sit amet luctus
              magna, nec mattis dui. Sed lacinia tempor ante. Aenean ut lobortis
              elit. Etiam vestibulum id orci condimentum maximus.
            </p>
            <p>
              Aliquam a congue lectus. Curabitur iaculis sapien non lobortis
              finibus. Quisque diam velit, fringilla ut mattis nec, fringilla
              nec ligula. Aenean in quam at nunc accumsan faucibus. Nullam at
              libero eget lorem fermentum laoreet vitae sit amet risus. Donec
              accumsan a elit non tristique. Nullam eget ex sagittis, commodo
              lectus at, dignissim risus.
            </p>
            <p>
              Praesent volutpat hendrerit interdum. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              In luctus tellus lorem, a vestibulum est consequat vitae. Nulla
              facilisi. Phasellus lacinia dapibus tortor sit amet auctor.
              Pellentesque lobortis mauris id ligula sodales finibus. Cras
              imperdiet nibh ac diam tincidunt, nec fermentum sem iaculis.
              Vivamus blandit augue ligula, nec molestie urna varius porta.
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
