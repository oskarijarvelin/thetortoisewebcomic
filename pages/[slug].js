import { useTina } from "tinacms/dist/react";
import { client } from "../.tina/__generated__/client";
import Layout from "../components/Layout";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Typography } from '@mui/material';

import settings from "../settings.json";

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout title={`${data.page.title} - ${settings.site_title}`} description={data.page.description}>
      <Typography variant="h2" component="h1" sx={{ my: 4, fontSize: { xs: '32px', md: '40px', lg: '48px' } }}>
        {data.page.title}
      </Typography>

      <TinaMarkdown content={data.page.body} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.pageConnection();
  const paths = data.pageConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.page({
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};