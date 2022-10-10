import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";
import Head from 'next/head';
import SingleComic from '../components/SingleComic';

export default function Home(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <Head>
        <title>The Tortoise Webcomic</title>
      </Head>
      <SingleComic comic={data.comicsConnection.edges[0].node} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  /*const { data, query, variables } = await client.queries.page({
    relativePath: "home.md",
  });*/
  const { data, query, variables } = await client.queries.comicsConnection({
    sort: 'date',
    last: 1,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};