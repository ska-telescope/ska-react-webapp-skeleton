import React from 'react';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import ReactSkeleton from '../components/ReactSkeleton/ReactSkeleton';
import TelescopeToggle from '../components/TelescopeToggle/TelescopeToggle';
import { storageObject } from '../services/stateStorage';
import theme from '../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 90;

function App() {
  const { t } = useTranslation('reactSkeleton');
  const { themeMode, toggleTheme } = storageObject.useStore();

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao: skao, mode: mode };
  const version = process.env.VERSION;

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        {
          // Header container :
          // Even distribution of the children is built in
          // Logo with URL link included
          // Button for light/dark mode included, and sample implementation provided.
        }
        <Header data-testid="skaHeader" themeToggle={toggleTheme} toolTip={toolTip}>
          <Grid item />
          <Grid item xs={0}>
            <Typography variant="h4">SKA SENSITIVITY CALCULATOR</Typography>
          </Grid>
          <Grid item />
        </Header>
        <Paper>
          {
            // Example of the spacer being used to shift content from behind the Header component
          }
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          {
            // This is the ONLY component that is accessible via micro-frontend implementation
          }
          <ReactSkeleton data-testid="reactSkeletonId" />
          {
            // Example of the spacer being used to stop content from being hidden behind the Footer component
          }
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        {
          // Footer container :
          // Even distribution of the children is built in
        }
        <Footer>
          <Grid item>{version}</Grid>
          <Grid item alignItems="center" justifyContent="center">
            <TelescopeToggle />
          </Grid>
          <Grid item />
        </Footer>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
