import React from 'react';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Footer,
  Header,
  Spacer,
  SPACER_VERTICAL,
  TelescopeSelector
} from '@ska-telescope/ska-gui-components';
import ReactSkeleton from '../components/ReactSkeleton/ReactSkeleton';
import { storageObject } from '../services/stateStorage';
import theme from '../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 90;

function App() {
  const { t } = useTranslation('reactSkeleton');
  const { themeMode, toggleTheme } = storageObject.useStore();
  const { telescope, updateTelescope } = storageObject.useStore();

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };
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
        <Header testId="headerId" themeToggle={toggleTheme} toolTip={toolTip}>
          <Grid item />
          <Grid item>
            <Typography variant="h4">SKA REACT SKELETON</Typography>
          </Grid>
          <Grid item />
        </Header>
        <Paper sx={{ height: '100vh' }}>
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
        <Footer testId="footerId">
          <Grid item>{version}</Grid>
          <Grid item alignItems="center" justifyContent="center">
            <TelescopeSelector
              current={telescope.code}
              setValue={updateTelescope}
              toolTip={t('toolTip.button.telescopeToggle')}
              value={telescope}
            />
          </Grid>
          <Grid item />
        </Footer>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
