import { useState } from 'react';
import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import Layout from "../../components/Layout";
import ExcerptComic from '../../components/ExcerptComic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PostList(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const comics = data.comicsConnection.edges;

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;

  function paginate(array) {
    return array.slice((currentPage - 1) * perPage, currentPage * perPage);
  }

  function moveToPage(p) {
    setCurrentPage(p);
    window.scrollTo(0, 0);
  }

  return (
    <Layout title="Comic Archive - The Tortoise Webcomic" description="Comic Archive - The Tortoise Webcomic">

      <Typography variant="h3" component="h1" sx={{ mb: 8 }}>Comic Archive</Typography>

      {paginate(comics).map((c, i) => (
        <Box key={i} sx={{ mb: 16 }} >
          <ExcerptComic comic={c.node} />
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Typography onClick={() => moveToPage(currentPage - 1)} sx={{ cursor: 'pointer', minWidth: '100px', '&:hover': { textDecoration: 'underline' } }}>
          {(currentPage > 1) &&
            <>&larr; Newer</>
          }
        </Typography>
        <Typography>Page {currentPage}</Typography>
        <Typography onClick={() => moveToPage(currentPage + 1)} sx={{ cursor: 'pointer', minWidth: '100px', '&:hover': { textDecoration: 'underline' } }}>
          {((comics.length > 2) && (comics.length > currentPage * perPage)) &&
            <>Older &rarr;</>
          }
        </Typography>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { data, query, variables } = await client.queries.comicsConnection({
    sort: 'date',
    last: 999999999,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
