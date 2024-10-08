import React from 'react';
import { Alert, CssBaseline, ThemeProvider } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const [showCopyright, setShowCopyright] = React.useState(false);
  const { help, helpToggle, telescope, themeMode, toggleTheme, updateTelescope } =
    storageObject.useStore();

  const LG = () => useMediaQuery(useTheme().breakpoints.down('lg')); // Allows us to code depending upon screen size
  const REQUIRED_WIDTH = useMediaQuery('(min-width:600px)');

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const headerTip = t('toolTip.button.docs');
  const headerURL = t('toolTip.button.docsURL');
  const docs = { tooltip: headerTip, url: headerURL };
  const toolTip = { skao, mode };
  const version = process.env.VERSION;
  const theStorage = {
    help,
    helpToggle,
    telescope,
    themeMode: themeMode.mode,
    toggleTheme,
    updateTelescope
  };

  const mediaSizeNotSupported = () => <Alert>{t('mediaSize.notSupported')}</Alert>;

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
          title={LG() ? 'SRK' : 'SKA React Skeleton'} // Use a 3 letter code for smaller screen widths
          toolTip={toolTip}
          selectTelescope={false}
          storage={theStorage}
          useSymbol={LG()}
        />
        {
          // Example of the spacer being used to shift content from behind the Header component
        }
        <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
        {
          // This is the ONLY component that is accessible via micro-frontend implementation
        }
        {REQUIRED_WIDTH && <ReactSkeleton />}
        {!REQUIRED_WIDTH && mediaSizeNotSupported()}
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
