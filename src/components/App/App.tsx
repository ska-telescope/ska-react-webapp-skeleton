/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import theme from '../../services/theme/theme';
import Loader from '../Loader/Loader';
import { Shell } from '../Shell/Shell';
import UserDetails from '../UserDetails/UserDetails';
import ReactSkeleton from '../ReactSkeleton/ReactSkeleton';

const SHOW_USER = true;

function App() {
  const { themeMode } = storageObject.useStore();

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Paper sx={{ height: '100vh' }}>
          <Shell>
            <>
              {SHOW_USER && <UserDetails />}
              {!SHOW_USER && <ReactSkeleton />}
            </>
          </Shell>
        </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
