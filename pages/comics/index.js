import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../../.tina/__generated__/client";

export default function PostList(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <h1>Comics</h1>
      <div>
        {data.comicsConnection.edges.map((c) => (
          <div key={c.node.id}>
            <Link href={`/comics/${c.node._sys.filename}`}>
              <a>{c.node._sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.comicsConnection();

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
