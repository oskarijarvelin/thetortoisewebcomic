import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from "../../.tina/__generated__/client";

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <h1 data-tinafield="title">{data.comics.title}</h1>
      <img data-tinafield="imgSrc" src={data.comics.imgSrc} />
      <div data-tinafield="data.comics.body">
        <TinaMarkdown content={data.comics.body} />
        </div>
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

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
