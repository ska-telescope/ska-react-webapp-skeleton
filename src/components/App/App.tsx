import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, MenuItem, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { AuthWrapper } from '@ska-telescope/ska-login-page';
import { Button, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import Loader from '../Loader/Loader';
import { Shell } from '../Shell/Shell';
import UserDetails from '../UserDetails/UserDetails';
import ReactSkeleton from '../ReactSkeleton/ReactSkeleton';
import { VERSION } from '../../utils/constants';

// USE_WRAPPER : Makes use of the AuthWrapper component from the ska-login-page library
// for a custom implementation, set this to false.  The Shell component illustrates a custom implemtentation.
const USE_WRAPPER = true; // Makes use of the AuthWrapper component from the ska-login-page library

const SHOW_USER = false;  // Indicates if the main aspect of the page is example components or user information

function App() {
  const { helpToggle, themeMode, toggleTheme } = storageObject.useStore();
  const { t } = useTranslation('authentication');

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Paper sx={{ height: '100vh' }}>  
        {false && <AuthWrapper // THIS OPTION SHOWS THE `AuthWrapper` WITH MANDATORY CONFIGURATION ONLY
              iconDocsURL="... some URL ..."
              storageThemeMode={themeMode.mode}
              storageToggleTheme={toggleTheme}
            />}
          {USE_WRAPPER && (
            <AuthWrapper
              iconDocsURL={t('iconDocs.url', { ns: 'common' })}
              buttonUserShowUsername
              // USE THE FOLLOWING FOR LOGOUT IN THE MENU UNDER THE BUTTON
              // REQUIRES THE `buttonUserMenu` PROPERTY
              buttonUserChildren={
                <MenuItem>
                  <Button icon="add" label="Dummy" testId="dummyButton" variant={ButtonVariantTypes.Text} />
                </MenuItem>
              }
              // USE THE CODE ANNOTATED OUT FOR LOGOUT IN THE SLIDE OUT PANEL
              // REMOVE THE `buttonUserMenu`  PROPERTY
              // buttonUserChildren={
              //   <Stack pb={1} >
              //     <Button icon="add" label="Dummy" testId="dummyButton"  />
              //   </Stack>
              // }
              buttonUserMenu
              mainChildren={
                <>
                  {SHOW_USER && <UserDetails />}
                  {!SHOW_USER && <ReactSkeleton />}
                </>
              }
              // storageHelp={"help"}
              storageHelpToggle={helpToggle}
              storageThemeMode={themeMode.mode}
              storageToggleTheme={toggleTheme}
              version={VERSION}
              versionTooltip="SOMETHING NICE"
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
