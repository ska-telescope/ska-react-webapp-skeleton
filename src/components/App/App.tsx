import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, ButtonColorTypes, ButtonVariantTypes, Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import LoginIcon from '@mui/icons-material/Login';
import Loader from '../Loader/Loader';
import ReactSkeleton from '../ReactSkeleton/ReactSkeleton';
import SKALogin from '../SKALogin/SKALogin';
import SKALogout from '../SKALogout/SKALogout';
import theme from '../../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 20;

function App() {
  const { t } = useTranslation('reactSkeleton');
  const { themeMode } = storageObject.useStore();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };
  const version = process.env.VERSION;
  const { user } = storageObject.useStore();

  // eslint-disable-next-line arrow-body-style
  const loginClicked = () => {
    setOpenLogin(true);
  };
  const logoutClicked = () => {
    setOpenLogout(true);
  };
  const closeLoginAndLogout = () => {
    setOpenLogin(false);
    setOpenLogout(false);
  };

  const loginButton = () => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {(!user || !user.username) && (
        <Button
          ariaDescription="ariaDescription"
          color={ButtonColorTypes.Secondary}
          variant={ButtonVariantTypes.Contained}
          onClick={loginClicked}
          label="LOGIN"
          icon={<LoginIcon />}
          testId="TESTID"
          toolTip="TOOLTIP"
        />
      )}
    </>
  );

  const loggedInButton = () => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {user && user.username && (
        <Button
          ariaDescription="ariaDescription"
          color={ButtonColorTypes.Inherit}
          variant={ButtonVariantTypes.Contained}
          onClick={logoutClicked}
          label={user.username}
          testId="TESTID"
          toolTip="TOOLTIP"
        />
      )}
    </>
  );

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
        {openLogin && (
          <SKALogin
            open={openLogin}
            setOpen={setOpenLogin}
            confirmFunction={closeLoginAndLogout}
            cancelFunction={closeLoginAndLogout}
          />
        )}
        {openLogout && (
          <SKALogout
            open={openLogout}
            setOpen={setOpenLogout}
            confirmFunction={closeLoginAndLogout}
            cancelFunction={closeLoginAndLogout}
          />
        )}
        <Header
          testId="headerId"
          title="ska react skeleton"
          toolTip={toolTip}
          selectTelescope={false}
        >
          {loginButton()}
          {loggedInButton()}
        </Header>
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
