import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";
import Layout from "../components/Layout";
import SingleComic from '../components/SingleComic';
import fs from 'fs';

export default function Home(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const newest = parseInt(props.comicCount);

  return (
    <Layout title="The Tortoise Webcomic" description="The Tortoise Webcomic">
      <SingleComic comic={data.comicsConnection.edges[0].node} newest={newest} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.comicsConnection({
    sort: 'date',
    last: 1,
  });

  const comicCount = fs.readdirSync('./comics').length

  return {
    props: {
      data,
      query,
      variables,
      comicCount,
    },
  };
};