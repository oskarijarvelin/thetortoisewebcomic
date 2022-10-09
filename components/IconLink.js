import Link from 'next/link'
import IconButton from '@mui/material/IconButton';

export default function IconLink({href, icon}) {
  return (
    <Link href={href} passHref>
        <IconButton
            edge="start"
            color="inherit"
            target="_blank" 
            rel="noopener"
            sx={{ ml: 1 }}
        >
            {icon}
        </IconButton>
    </Link>
  )
}