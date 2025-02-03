/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { AuthWrapper } from '@ska-telescope/ska-login-page';
import theme from '../../services/theme/theme';
import Loader from '../Loader/Loader';
import { Shell } from '../Shell/Shell';
import UserDetails from '../UserDetails/UserDetails';
import ReactSkeleton from '../ReactSkeleton/ReactSkeleton';
import { VERSION } from '../../utils/constants';

const USE_WRAPPER = false;
const SHOW_USER = true;

function App() {
  const { help, helpToggle, themeMode, toggleTheme } = storageObject.useStore();
  const { t } = useTranslation('authentication');

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Paper sx={{ height: '100vh' }}>
          {USE_WRAPPER && (
            <AuthWrapper
              mainChildren={
                <>
                  {SHOW_USER && <UserDetails />}
                  {!SHOW_USER && <ReactSkeleton />}
                </>
              }
              footerChildren={null}
              version={VERSION}
              application="Application"
              buttonLoginLabel={t('button.signIn')}
              buttonLoginToolTip={t('toolTip.button.signIn')}
              buttonLogoutLabel={t('button.signOut')}
              buttonLogoutToolTip={t('toolTip.button.user')}
              buttonUserShowPhoto
              buttonUserShowUsername
              buttonUserToolTip={t('toolTip.button.signOut')}
              headerChildren={null}
              docsIconToolTip={t('toolTip.button.docs')}
              docsURL={t('toolTip.button.docsURL')}
              skaoLogoToolTip={t('toolTip.button.skao')}
              themeModeToolTip={t('toolTip.button.mode')}
              storageHelp={help}
              storageHelpToggle={helpToggle}
              storageThemeMode={themeMode.mode}
              storageToggleTheme={toggleTheme}
            />
          )}
          {!USE_WRAPPER && (
            <Shell>
              <>
                {SHOW_USER && <UserDetails />}
                {!SHOW_USER && <ReactSkeleton />}
              </>
            </Shell>
          )}
        </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
