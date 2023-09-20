import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Logo from "../../assets/Logo";
import { openSidebar, closeSidebar } from '../../utils/utils';
import ColorSchemeToggle from './ColorSchemeToggle';
import LogoSVG from '../../assets/Logo';
import { Typography } from '@mui/joy';
import {useNavigate} from "react-router-dom";

export default function FirstSidebar() {
  const navigate = useNavigate();
  return (
    <Sheet
      className="FirstSidebar"
      color="primary"
      invertedColors
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--FirstSidebar-width)',
        top: 0,
        p: 1.5,
        py: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '--FirstSidebar-width': '68px',
          },
        }}
      />
      <IconButton
        variant="soft"
        color="neutral"
        onClick={() => closeSidebar()}
        sx={{ display: { md: 'none' }, mt: -2, borderRadius: '50%' }}
      >
        <i data-feather="arrow-left" />
      </IconButton>
      <LogoSVG width={40} height={40} color={"darkgray"} sx={{ mb:0 }}/>
      <List sx={{ '--ListItem-radius': '8px', '--List-gap': '12px' }}>
        <ListItem>
          <ListItemButton selected onClick={() => navigate('/dashboard')}>
            <i data-feather="home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="grid" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate('/invite/buddies')}>
            <i data-feather="user-plus" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="calendar" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="bar-chart-2" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="users" />
          </ListItemButton>
        </ListItem>
      </List>
      <List
        sx={{
          mt: 'auto',
          flexGrow: 0,
          '--ListItem-radius': '8px',
          '--List-gap': '8px',
        }}
      >
        <ColorSchemeToggle sx={{ display: { xs: 'none', md: 'inline-flex' } }} />
        <ListItem>
          <ListItemButton>
            <i data-feather="at-sign" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <i data-feather="settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Avatar variant="outlined"/>
    </Sheet>
  );
}
