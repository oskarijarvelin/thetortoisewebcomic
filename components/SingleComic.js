import Box from '@mui/material/Box';
import Link from './Link';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function SingleComic({key, comic}) {
  return (
    <Box key={key}>
        <h2>
            <Link href={`/comics/${comic._sys.filename}`} color="inherit" sx={{ textDecoration: 'none' }}>
                {comic.title}
            </Link>
        </h2>
        <Link href={comic.imgSrc}>
            <a>
                <img src={comic.imgSrc} width="100%" height="auto" />
            </a>
        </Link>
        <TinaMarkdown content={comic.body} />
    </Box>
  )
}
