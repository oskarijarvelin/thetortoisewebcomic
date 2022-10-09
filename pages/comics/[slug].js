import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from "../../.tina/__generated__/client";
import Link from 'next/link';

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <Link href={data.comics.imgSrc} >
        <a>
          <img data-tinafield="imgSrc" src={data.comics.imgSrc} />
        </a>
      </Link>
      <h1 data-tinafield="title">{data.comics.title}</h1>
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
