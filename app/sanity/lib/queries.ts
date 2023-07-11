import groq from 'groq';

export const slugProjection = `"slug": slug.current`;

export const imageFieldsFragment = `
  crop,
  hotspot,
  asset->{
    _id,
    _type,
    altText,
    description,
    metadata {
      lqip,
      dimensions {
        aspectRatio,
        height,
        width
      }
    },
  }
`;

// const linkFragment = `
//   "_key": @.link[0]._key,
//   "_type": @.link[0]._type,
//   linkText,
//   @.link[0]._type == "linkInternal" => {
//     @.link[0].reference->isFrontpage => {
//       "href": '/'
//     },
//     @.link[0].reference->isFrontpage != true => {
//       "href": coalesce(@.link[0].reference->slug.current, '#')
//     }
//   },
//   @.link[0]._type == "linkExternal" => {
//     "href": coalesce(@.link[0].url, '#'),
//     "newWindow": @.link[0].newWindow
//   }
// `;
const richTextFragment = groq`
  _key,
  _type,
  _type != "image" => {
    ...
  },
  _type == "image" => {
    "image": {
      ${imageFieldsFragment}
    }
  }
`;

const postFields = groq`
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  ${slugProjection},
  body[]{
    ${richTextFragment}
  },
  featuredImage {
    ${imageFieldsFragment}
  },
  seo
`;

export const siteTitleQuery = groq`
  *[_type == "siteSettings"][0].title
`;
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    _id,
    title,
    tagline,
    siteUrl,
    "pastor": *[_type == "pastorSettings"][0]{
      name,
      email,
      phone,
      address,
      bio,
      image {
        ${imageFieldsFragment}
      },
      profileImage {
        ${imageFieldsFragment}
      }
    },
  }
`;

export const redirectsQuery = groq`
  *[_type == "redirect"]`;

// export const redirectSettingsIdQuery = groq`
//   *[_type == "redirectSettings"][0]._id
// `;
export const postsQuery = groq`
  *[_type == "post"] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    ${slugProjection},
    seo
    // "body": pt::text(body)
  }
`;
export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const devotionalsQuery = groq`
  *[_type == "devotional"] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    ${slugProjection},
    seo
    // "body": pt::text(body)
  }
`;
export const devotionalBySlugQuery = groq`
*[_type == "devotional" && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  ${slugProjection},
  body[]{
    ${richTextFragment}
  },
  featuredImage {
    ${imageFieldsFragment}
  },
  seo
}
`;

export const sermonsQuery = groq`
  *[_type == "sermon"] {
    _id,
    title,
    date,
    keyText,
    videoId,
  }
`;

export const indexQuery = groq`
  {
    "pastor": *[_type == "pastorSettings"][0]{
      bio,
    },
    "posts": *[_type == "post"][0..2] {
      ${postFields}
    },
    "sermons": *[_type == "sermon"][0..2] {
      _id,
      title,
      date,
      keyText,
      videoId,
      poster {
        ${imageFieldsFragment}
      }
    }
  }
`;
