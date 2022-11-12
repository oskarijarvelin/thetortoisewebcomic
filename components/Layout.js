import * as React from 'react';
import Head from 'next/head';
import IconLink from './IconLink';
import Link from './Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { IoMenu } from 'react-icons/io5';
import { BiHomeAlt, BiArchive } from 'react-icons/bi';
import { SiSpringCreators } from 'react-icons/si';
import { FaPatreon, FaTwitter, FaFacebook, FaInstagram, FaRedditAlien } from 'react-icons/fa';

import settings from "../settings.json";

const mainMenu = [
  { title: settings.nav_title_home, url: '/', icon: <BiHomeAlt /> },
  { title: settings.nav_title_archive, url: '/comics', icon: <BiArchive /> },
];

const social = [
  { title: settings.spring.title, url: settings.spring.url, icon: <SiSpringCreators /> },
  { title: settings.patreon.title, url: settings.patreon.url, icon: <FaPatreon /> },
  { title: settings.twitter.title, url: settings.twitter.url, icon: <FaTwitter /> },
  { title: settings.facebook.title, url: settings.facebook.url, icon: <FaFacebook /> },
  { title: settings.instagram.title, url: settings.instagram.url, icon: <FaInstagram /> },
  { title: settings.reddit.title, url: settings.reddit.url, icon: <FaRedditAlien /> },
];

export default function Layout({ children, title, description }) {
  const [menu, setMenu] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenu(open);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>
      <AppBar position="fixed">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
              {settings.site_title}
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {social.map((s, i) => (
              <IconLink key={i} title="s.title" url={s.url} icon={s.icon} />
            ))}
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={toggleDrawer(true)}
          >
            <IoMenu />
          </IconButton>

        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="right"
        open={menu}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{ top: '64px !important' }}
      >
        <Box sx={{ width: 300 }}>
          <List>
            {mainMenu.map((s, index) => (
              <ListItem key={index} disablePadding>
                <Link href={s.url} color="inherit" sx={{ textDecoration: 'none', width: '100%' }} onClick={toggleDrawer(false)}>
                  <ListItemButton>
                    <ListItemIcon sx={{ fontSize: 22 }}>
                      {s.icon}
                    </ListItemIcon>
                    <ListItemText primary={s.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            {settings.mainnav.nav.map((item, index) => (
              <ListItem key={index} disablePadding>
                <Link href={item.url} color="inherit" sx={{ textDecoration: 'none', width: '100%' }} onClick={toggleDrawer(false)}>
                  <ListItemButton>
                    <ListItemIcon sx={{ fontSize: 22 }}></ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {social.map((s, index) => (
              <ListItem key={index} disablePadding>
                <Link href={s.url} color="inherit" sx={{ textDecoration: 'none', width: '100%' }} target="_blank" rel="noopener" onClick={toggleDrawer(false)}>
                  <ListItemButton>
                    <ListItemIcon sx={{ fontSize: 20 }}>
                      {s.icon}
                    </ListItemIcon>
                    <ListItemText primary={s.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

      <Box component="main" sx={{ mt: '64px', py: 8, px: 2, minHeight: 'calc(100vh - 120px)' }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      <Box component="footer" sx={{ backgroundColor: "#FAFAFA", py: 2 }}>
        <Container maxWidth="lg">
          <Typography component="p" align="center">
            {settings.site_footer.replace("{year}", new Date().getFullYear())}
          </Typography>
        </Container>
      </Box>
    </>
  )
}
