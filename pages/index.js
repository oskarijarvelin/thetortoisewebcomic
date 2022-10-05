import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";

export default function Home(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <h1 data-tinafield="title">{data.page.title}</h1>
      <div data-tinafield="body">
        <TinaMarkdown content={data.page.body} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
