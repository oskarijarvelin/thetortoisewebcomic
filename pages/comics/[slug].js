import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from "../../.tina/__generated__/client";
import Link from '../../components/Link';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { GrLink } from 'react-icons/gr';
import Moment from 'react-moment';
import moment from 'moment';

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <Box>

        <Link href={data.comics.imgSrc}>
          <a>
            <img data-tinafield="imgSrc" src={data.comics.imgSrc} width="100%" height="auto" />
          </a>
        </Link>

        <Typography variant="h3" component="h1" sx={{ mt: 4, mb: 8 }} data-tinafield="title">
          <Link href={`/comics/${data.comics._sys.filename}`} color="inherit" sx={{ textDecoration: 'none' }}>
            <small><GrLink /></small> {data.comics.title}
          </Link>
        </Typography>

        <Typography sx={{ fontWeight: 500, color: '#666' }}>
          <span data-tinafield="index">#{data.comics.index}</span>{' '}&bull;{' '}
          <span data-tinafield="date"><Moment format="DD.MM.YYYY">{data.comics.date}</Moment></span>
        </Typography>

        <Box data-tinafield="body" sx={{ mt: 4 }}>
          <TinaMarkdown content={data.comics.body} />
        </Box>

      </Box>
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
