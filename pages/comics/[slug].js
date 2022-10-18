import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from "../../.tina/__generated__/client";
import { useRouter } from 'next/router'
import Link from '../../components/Link';
import ComicNav from '../../components/ComicNav';
import SingleComic from '../../components/SingleComic';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { GrLink } from 'react-icons/gr';
import Moment from 'react-moment';
import moment from 'moment';
import fs from 'fs'

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const router = useRouter();
  const newest = parseInt(props.comicCount);
  const current = parseInt(router.query.slug);

  return (
    <Layout>
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
