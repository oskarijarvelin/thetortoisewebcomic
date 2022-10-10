import { Layout } from "../../components/Layout";
import Head from 'next/head';
import Link from 'next/link';
import { useTina } from "tinacms/dist/edit-state";
import { client } from "../../.tina/__generated__/client";
import ExcerptComic from '../../components/ExcerptComic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'

export default function PostList(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const router = useRouter()
  const { page } = router.query

  return (
    <Layout>
      <Head>
        <title>Comic Archive - The Tortoise Webcomic</title>
      </Head>

      <Typography variant="h3" component="h1" sx={{ mb: 8 }}>Comic Archive</Typography>

      {data.comicsConnection.edges.map((c, i) => (
        <Box key={i} sx={{ mb: 16 }} >
          <ExcerptComic comic={c.node} />
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Typography>
          {page &&
            <>
              {(page > 2) &&
                <Link href={`/comics/?page=${parseInt(page) - 1}`}>&larr; Newer</Link>
              }
              {(page == 2) &&
                <Link href="/comics/">&larr; Newer</Link>
              }
            </>
          }
        </Typography>
        <Typography>Page {page ? page : 1}</Typography>
        <Typography>
          {data.comicsConnection.pageInfo.hasPreviousPage &&
            <>
              {page &&
                <Link href={`/comics/?page=${parseInt(page) + 1}`}>Older &rarr;</Link>
              }
              {!page &&
                <Link href="/comics/?page=2">Older &rarr;</Link>
              }
            </>
            
          }
        </Typography>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data, query, variables } = await client.queries.comicsConnection({
    sort: 'date',
    last: 2,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
