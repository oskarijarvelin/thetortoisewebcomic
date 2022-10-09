import * as React from 'react';
import IconLink from './IconLink';
import Link from './Link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { IoMenu } from 'react-icons/io5';
import { SiSpringCreators } from 'react-icons/si';
import { FaPatreon, FaTwitter, FaFacebook, FaInstagram, FaRedditAlien } from 'react-icons/fa';

export const Layout = (props) => {
  const [ menu, setMenu ] = React.useState(false);
  
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
        <AppBar position="fixed">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
                  The Tortoise Webcomic
              </Link>
            </Typography>

            <Box>
              <IconLink href="https://thetortoisewebcomic.creator-spring.com/" icon={<SiSpringCreators />} />
              <IconLink href="https://www.patreon.com/thetortoisewebcomic" icon={<FaPatreon />} />
              <IconLink href="https://thetortoisewebcomic.creator-spring.com/" icon={<FaTwitter />} />
              <IconLink href="https://www.facebook.com/thetortoisewebcomic" icon={<FaFacebook />} />
              <IconLink href="https://www.instagram.com/thetortoisewebcomic/" icon={<FaInstagram />} />
              <IconLink href="https://www.reddit.com/r/thetortoisewebcomic/" icon={<FaRedditAlien />} />
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
        <Box sx={{ width: 250, p: 4 }}>
          <Typography>Testi</Typography>
        </Box>
      </SwipeableDrawer>

      <Box component="main" sx={{ mt: '64px', py: 4, px: 2, minHeight: 'calc(100vh - 64px)' }}>
        <Container maxWidth="lg">{props.children}</Container>
      </Box>

      <Box component="footer" sx={{ backgroundColor: "#FAFAFA", py: 2 }}>
        <Container maxWidth="lg">
          <Typography component="p" align="center">
            &copy; 2022 The Tortoise Webcomic. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  )
}
