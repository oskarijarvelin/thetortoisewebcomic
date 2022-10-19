
import { useRouter } from 'next/router'
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../../.tina/__generated__/client";
import Layout from "../../components/Layout";
import SingleComic from '../../components/SingleComic';
import fs from 'fs'

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const newest = parseInt(props.comicCount);

  return (
    <Layout title={`#${data.comics.index}: ${data.comics.title}`} description={`#${data.comics.index} ${data.comics.title}`}>
      <SingleComic comic={data.comics} newest={newest} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.comicsConnection();
  const paths = data.comicsConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.comics({
    relativePath: ctx.params.slug + ".md",
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
