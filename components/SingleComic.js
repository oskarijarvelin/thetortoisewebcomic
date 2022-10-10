import Box from '@mui/material/Box';
import Link from './Link';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { GrLink } from 'react-icons/gr';
import { Typography } from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';

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

        <Typography sx={{ fontWeight: 500, color: '#666' }}>#{comic.index} &bull; <Moment format="DD.MM.YYYY">{comic.date}</Moment></Typography>
        
        <TinaMarkdown content={comic.body} />
    </Box>
  )
}
