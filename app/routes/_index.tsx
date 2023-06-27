import type {
  // LinksFunction,
  LoaderArgs,
  // SerializeFrom,
  // V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';

// import { getPreviewToken } from '~/sanity/lib/helpers';
// import type { Page as PagePayload, PageBuilder } from '~/types/page';

// export const meta: V2_MetaFunction = ({ matches }) => {
//   const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
//     | { data: SerializeFrom<typeof rootLoader> }
//     | undefined;

//   const pageData = matches.find((match: RouteMatch) => match.id === `root`) as
//     | { data: SerializeFrom<typeof loader> }
//     | undefined;

//   const rootTitle = rootData ? rootData.data.siteTitle : "";
//   const pageTitle = pageData?.data.page?.seo?.title ?? "";
//   const title = pageTitle
//     ? [pageTitle, rootTitle].filter(Boolean).join(" | ")
//     : rootTitle;

//   return [{ title }];
// };

export const loader = async ({ request }: LoaderArgs) => {
  // const { preview } = await getPreviewToken(request);

  // let data: any, query: string, page: any;

  // TOOD: get posts or somethign..

  return json({
    data: null,
    query: null,
    params: null,
  });
};

export default function Index() {
  // const { data, query, params } = useLoaderData<typeof loader>();

  return <div>Index Route</div>;
}
