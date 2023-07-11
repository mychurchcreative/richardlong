import { LoaderArgs, V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { Image } from '~/components/image';
import { Prose } from '~/components/prose';
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

  const title = ['Contact', siteTitle].filter(Boolean).join(' | ');
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

const ContactRoute = () => {
  const { settings } = useRootLoaderData();
  const { pastor } = settings ?? {};
  return (
    <Container className="mt-16 sm:mt-32">
      <Prose>
        <p className="text-center">Do we need this?</p>
      </Prose>
    </Container>
  );
};

export default ContactRoute;
