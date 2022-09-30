import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar, Icon, IconButton, Typography,
} from '@mui/material';
import LoginButton from './LoginButton/LoginButton';
import { AuthContext } from '../../contexts/AuthContext';
import NavLink from '../NavLink/NavLink';

export default function TemporaryDrawer() {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <div>

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer('right', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250, display: 'flex', flexDirection: 'column', height: 1,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >

          {currentUser && (
            <>
              <List>

                <ListItem key="user" disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary={currentUser.username} />
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider />
            </>
          )}
          <List>
            {/* <ListItem key="collections" disablePadding>
              <NavLink target="/collections">Collections</NavLink>
            </ListItem> */}
          </List>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}
          >
            <LoginButton />
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
