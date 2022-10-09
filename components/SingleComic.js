import Box from '@mui/material/Box';
import Link from './Link';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { GrLink } from 'react-icons/gr';

export default function SingleComic({comic}) {
  return (
    <Box>
        <Link href={comic.imgSrc}>
            <a>
                <img src={comic.imgSrc} width="100%" height="auto" />
            </a>
        </Link>
        
        <h2>
            <Link href={`/comics/${comic._sys.filename}`} color="inherit" sx={{ textDecoration: 'none' }}>
            <small><GrLink /></small> {comic.title}
            </Link>
        </h2>
        
        <TinaMarkdown content={comic.body} />
    </Box>
  )
}
