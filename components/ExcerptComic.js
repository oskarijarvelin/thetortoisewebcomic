import Box from '@mui/material/Box';
import Link from './Link';

export default function ExcerptComic({ comic }) {
  return (
    <Box>
      <Link href={`/comics/${comic._sys.filename}`}>
        <img src={comic.imgSrc} width="100%" height="auto" alt={`#${comic.index} ${comic.title}`} loading="lazy" />
      </Link>
    </Box>
  )
}
