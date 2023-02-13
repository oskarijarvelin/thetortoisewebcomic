import Link from 'next/link'
import IconButton from '@mui/material/IconButton';

export default function IconLink({title, url, icon}) {
  return (
    <Link href={url} passHref>
      <IconButton
        arian-label={title}
        component="span"
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