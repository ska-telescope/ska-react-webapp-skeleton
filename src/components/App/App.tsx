import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  CopyrightModal,
  Footer,
  Header,
  Spacer,
  SPACER_VERTICAL
} from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Loader from '../Loader/Loader';
import ReactSkeleton from '../ReactSkeleton/ReactSkeleton';
import theme from '../../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 20;

function App() {
  const { t } = useTranslation('reactSkeleton');
  const { themeMode } = storageObject.useStore();
  const [showCopyright, setShowCopyright] = React.useState(false);

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const headerTip = t('toolTip.button.docs');
  const headerURL = t('toolTip.button.docsURL');
  const docs = { tooltip: headerTip, url: headerURL };
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
        <CopyrightModal copyrightFunc={setShowCopyright} show={showCopyright} />
        <Header
          docs={docs}
          testId="headerId"
          title="ska react skeleton"
          toolTip={toolTip}
          selectTelescope={false}
        />
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
        {
          // Footer container :
          // Even distribution of the children is built in
        }
        <Footer copyrightFunc={setShowCopyright} testId="footerId" version={version} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
