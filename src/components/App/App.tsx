import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Loader from '../Loader/Loader';
import ReactSkeleton from '../ReactSkeleton/ReactSkeleton';
import theme from '../../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 20;

function App() {
  const { t } = useTranslation('reactSkeleton');
  const { themeMode } = storageObject.useStore();

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };
  const version = process.env.VERSION;

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        {
          // Header container :
          // Even distribution of the children is built in
          // Logo with URL link included
          // Button for light/dark mode included, and sample implementation provided.
          // TelescopeSelector build in, displayed as determined by selectTelescope property
        }
        <Header
          testId="headerId"
          title="ska react skeleton"
          toolTip={toolTip}
          selectTelescope={false}
        />
        <Paper sx={{ height: '100%' }}>
          {
            // Example of the spacer being used to shift content from behind the Header component
          }
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          {
            // This is the ONLY component that is accessible via micro-frontend implementation
          }
          <ReactSkeleton />
          {
            // Example of the spacer being used to stop content from being hidden behind the Footer component
          }
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        {
          // Footer container :
          // Even distribution of the children is built in
        }
        <Footer testId="footerId" version={version} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
