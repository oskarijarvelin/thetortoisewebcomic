import { defineConfig, defineSchema, RouteMappingPlugin } from "tinacms";
import { client } from "./__generated__/client";

const schema = defineSchema({
  config: {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch:
      process.env.NEXT_PUBLIC_TINA_BRANCH ||
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
      process.env.HEAD,
    token: process.env.TINA_TOKEN,
    media: {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Otsikko",
          name: "title",
        },
        {
          name: "body",
          label: "Sisältö",
          type: "rich-text",
          isBody: true,
        },
      ],
    },
    {
      label: "Comics",
      name: "comics",
      path: "comics",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Otsikko",
          name: "title",
        },
        {
          type: 'image',
          label: 'Sarjakuva',
          name: 'imgSrc',
        },
        {
          type: "rich-text",
          label: "Kuvaus",
          name: "body",
          isBody: true,
        },
      ],
    },
  ],
});

export default schema;

export const tinaConfig = defineConfig({
  client,
  schema,
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

      return undefined;
    });

    cms.plugins.add(RouteMapping);

    return cms;
  },
});
