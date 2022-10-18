import Box from '@mui/material/Box';
import Link from './Link';
import ComicNav from './ComicNav';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { GrLink } from 'react-icons/gr';
import { Typography } from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';

export default function SingleComic({ comic, newest }) {
  return (
    <Box>
      <ComicNav current={comic.index} newest={newest} />
      <Link href={comic.imgSrc}>
        <a>
          <img src={comic.imgSrc} width="100%" height="auto" alt={`#${comic.index} ${comic.title}`} />
        </a>
      </Link>

      <Typography variant="h2" component="h1" sx={{ my: 4 }}>
        <Link href={`/comics/${comic._sys.filename}`} color="inherit" sx={{ textDecoration: 'none' }}>
          <small><GrLink /></small> {comic.title}
        </Link>
      </Typography>

      <Typography sx={{ fontWeight: 500, color: '#666' }}>#{comic.index} &bull; <Moment format="DD.MM.YYYY">{comic.date}</Moment></Typography>

      <Box sx={{ mb: 8 }}>
        <TinaMarkdown content={comic.body} />
      </Box> 
      <ComicNav current={comic.index} newest={newest} />
    </Box>
  )
}
