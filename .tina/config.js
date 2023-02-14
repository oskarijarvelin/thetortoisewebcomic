import { defineConfig, RouteMappingPlugin } from "tinacms";
import { client } from "./__generated__/client";

const config = defineConfig({
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
            slugify: values => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-') || 'new_page'}`
            },
          },
        },
        fields: [
          {
            type: "string",
            label: "Otsikko",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            label: 'Metakuvaus (50-160 merkkiä)',
            name: 'description',
            ui: {
              component: 'textarea',
            },
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
        defaultItem: () => {
          return {
            date: new Date().toISOString(),
          }
        },
        ui: {
          filename: {
            readonly: true,
            slugify: values => {
              return `${values?.index || '0'}`
            },
          },
        },
        fields: [
          {
            label: "Unique Index",
            name: "index",
            type: "number",
            required: true,
          },
          {
            type: "string",
            label: "Otsikko",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            label: "Päivämäärä",
            name: "date",
            ui: {
              dateFormat: 'DD.MM.YYYY'
            }
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
  },
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
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

      return undefined;
    });

    cms.plugins.add(RouteMapping);

    return cms;
  },
});

export default config;