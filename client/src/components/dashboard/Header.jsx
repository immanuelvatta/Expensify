import { useEffect, useState } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import LogoSVG from '../../assets/Logo';
import { Typography } from '@mui/joy';
import { toggleSidebar } from '../../utils/utils';
import  Box  from '@mui/joy/Box';

function ColorSchemeToggle({ onClick, sx, ...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...props}
        sx={sx}
        disabled
      />
    );
  }

  return (
    <IconButton
      size="sm"
      variant="outlined"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
      sx={[
        {
          '& > *:first-of-type': {
            display: mode === 'dark' ? 'none' : 'initial',
          },
          '& > *:last-of-type': {
            display: mode === 'light' ? 'none' : 'initial',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <i data-feather="moon" />
      <i data-feather="sun" />
    </IconButton>
  );
}

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        py: 1,
        px: 2,
        gap: 1,
        boxShadow: 'sm',
        justifyContent: "space-between"
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
        />
      <Box sx={{ display: "flex", alignItems: 'center', gap: 2.5 }}>
        <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <i data-feather="menu" />
        </IconButton>
        <LogoSVG width={40} height={40} color={"darkgray"} />
        <Typography sx={{ mt: 0 }}>
          Expensify
        </Typography>
      </Box>
      <ColorSchemeToggle id={undefined} />
    </Sheet>
  );
}
