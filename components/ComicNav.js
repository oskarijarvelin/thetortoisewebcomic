import Link from './Link';
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { GrChapterPrevious, GrCaretPrevious, GrCaretNext, GrChapterNext } from 'react-icons/gr';

export default function ComicNav({ current, newest }) {
    return (
        <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>

            <Link href={`/comics/${newest}`} color="inherit" sx={{ textDecoration: 'none', mx: { xs: 1, lg: 3 }, cursor: (current < newest) ? 'pointer' : 'not-allowed' }}>
                <IconButton disabled={(current < newest) ? false : true} sx={{ fontSize: { xs: '32px', lg: '48px' }, opacity: (current < newest) ? 1 : '0.2' }}>
                    <GrChapterPrevious />
                </IconButton>
            </Link>

            <Link href={`/comics/${(current < newest) ? current + 1 : current}`} color="inherit" sx={{ textDecoration: 'none', mx: { xs: 1, lg: 3 }, cursor: (current < newest) ? 'pointer' : 'not-allowed' }}>
                <IconButton disabled={(current < newest) ? false : true} sx={{ fontSize: { xs: '32px', lg: '48px' }, opacity: (current < newest) ? 1 : '0.2' }}>
                    <GrCaretPrevious />
                </IconButton>
            </Link>

            <Link href={`/comics/${(current > 1) ? current - 1 : current}`} color="inherit" sx={{ textDecoration: 'none', mx: { xs: 1, lg: 3 }, cursor: (current > 1) ? 'pointer' : 'not-allowed' }}>
                <IconButton disabled={(current > 1) ? false : true} sx={{ fontSize: { xs: '32px', lg: '48px' }, opacity: (current > 1) ? 1 : '0.2' }}>
                    <GrCaretNext />
                </IconButton>
            </Link>

            <Link href={`/comics/1`} color="inherit" sx={{ textDecoration: 'none', mx: { xs: 1, lg: 3 }, cursor: (current > 1) ? 'pointer' : 'not-allowed' }}>
                <IconButton disabled={(current > 1) ? false : true} sx={{ fontSize: { xs: '32px', lg: '48px' }, opacity: (current > 1) ? 1 : '0.2' }}>
                    <GrChapterNext />
                </IconButton>
            </Link>

        </Typography>
    )
}
