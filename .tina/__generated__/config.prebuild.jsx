// .tina/config.js
import { defineConfig, RouteMappingPlugin } from "tinacms";

// .tina/__generated__/client.js
import { createClient as createClient2 } from "tinacms/dist/client";

// .tina/__generated__/types.js
import { createClient } from "tinacms/dist/client";
function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
var PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  title
  description
  body
}
    `;
var ComicsPartsFragmentDoc = gql`
    fragment ComicsParts on Comics {
  __typename
  index
  title
  date
  imgSrc
  body
}
    `;
var PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
var PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
var ComicsDocument = gql`
    query comics($relativePath: String!) {
  comics(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ComicsParts
  }
}
    ${ComicsPartsFragmentDoc}`;
var ComicsConnectionDocument = gql`
    query comicsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ComicsFilter) {
  comicsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ComicsParts
      }
    }
  }
}
    ${ComicsPartsFragmentDoc}`;
function getSdk(requester) {
  return {
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    comics(variables, options) {
      return requester(ComicsDocument, variables, options);
    },
    comicsConnection(variables, options) {
      return requester(ComicsConnectionDocument, variables, options);
    }
  };
}
var generateRequester = (client2) => {
  const requester = async (doc, vars, options) => {
    let url = client2.apiUrl;
    if (options?.branch) {
      const index = client2.apiUrl.lastIndexOf("/");
      url = client2.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client2.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
var queries = (client2) => {
  const requester = generateRequester(client2);
  return getSdk(requester);
};

// .tina/__generated__/client.js
var client = createClient2({ url: "http://localhost:4001/graphql", token: "25aaf6f2a42ddc1b3810bb8130333dd8a333c086", queries });

// .tina/config.js
var config = defineConfig({
  schema: {
    collections: [
      {
        label: "Pages",
        name: "page",
        path: "content",
        format: "md",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-") || "new_page"}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            label: "Otsikko",
            name: "title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            label: "Metakuvaus (50-160 merkki\xE4)",
            name: "description",
            ui: {
              component: "textarea"
            }
          },
          {
            name: "body",
            label: "Sis\xE4lt\xF6",
            type: "rich-text",
            isBody: true
          }
        ]
      },
      {
        label: "Comics",
        name: "comics",
        path: "comics",
        format: "md",
        defaultItem: () => {
          return {
            date: (/* @__PURE__ */ new Date()).toISOString()
          };
        },
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.index || "0"}`;
            }
          }
        },
        fields: [
          {
            label: "Unique Index",
            name: "index",
            type: "number",
            required: true
          },
          {
            type: "string",
            label: "Otsikko",
            name: "title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            label: "P\xE4iv\xE4m\xE4\xE4r\xE4",
            name: "date",
            ui: {
              dateFormat: "DD.MM.YYYY"
            }
          },
          {
            type: "image",
            label: "Sarjakuva",
            name: "imgSrc"
          },
          {
            type: "rich-text",
            label: "Kuvaus",
            name: "body",
            isBody: true
          }
        ]
      }
    ]
  },
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    }
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  cmsCallback: (cms) => {
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if (["page"].includes(collection.name)) {
        if (document._sys.filename === "home") {
          return "/";
        } else {
          return `/${document._sys.filename}`;
        }
      }
      if (["comics"].includes(collection.name)) {
        return `/comics/${document._sys.filename}`;
      }
      return void 0;
    });
    cms.plugins.add(RouteMapping);
    return cms;
  }
});
var config_default = config;
export {
  config_default as default
};
