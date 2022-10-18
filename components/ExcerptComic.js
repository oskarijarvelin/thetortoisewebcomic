import Box from '@mui/material/Box';
import Link from './Link';

export default function ExcerptComic({comic}) {
  return (
    <Box>
      <Link href={comic.imgSrc}>
        <a>
          <img src={comic.imgSrc} width="100%" height="auto" alt={`#${comic.index} ${comic.title}`} loading="lazy" />
        </a>
      </Link>
    </Box>
  )
}
