import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import {useScript} from "../utils/useScript";
import FirstSidebar from '../components/dashboard/FirstSidebar'; 
import Header from '../components/dashboard/Header';
import RentalCard from '../components/dashboard/RentalCard';
import Main from '../components/dashboard/main';
import HeaderSection from '../components/dashboard/HeaderSection';
import Search from '../components/dashboard/Search';
import Filters from '../components/dashboard/Filters';
import Toggles from '../components/dashboard/Toggles';
import Pagination from '../components/dashboard/Pagination';
import { Typography } from '@mui/joy';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export function Dashboard() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <GlobalStyles
        styles={(theme) => ({
          '[data-feather], .feather': {
            color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
            margin: 'var(--Icon-margin)',
            fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
            width: '1em',
            height: '1em',
          },
        })}
      />
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <FirstSidebar />
        <Main>
            <Typography sx={{  }}>
                welcome
            </Typography>
        </Main>
      </Box>
    </CssVarsProvider>
  );
}