/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { CssBaseline, Paper, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { UserProfile } from '../UserProfile/UserProfile';
import theme from '../../services/theme/theme';
import { fullHeight } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { MsalAuthenticationTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { Shell } from '../Shell/Shell';

function App() {
  const { themeMode } = storageObject.useStore();
  const { t } = useTranslation('authentication');

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Paper sx={{ height: '100vh' }}>
          <Shell>
            <Box
              m={5}
              sx={{
                height: fullHeight(),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography component="h1" variant="h5">
                {t('label.usingMSEntra')}
              </Typography>
              <Typography component="h1" variant="h5">
                <MsalAuthenticationTemplate interactionType={InteractionType.None}>
                  <p>{t('label.msEntraUserSignedIn')}</p>
                </MsalAuthenticationTemplate>
                <UnauthenticatedTemplate>
                  <p>{t('label.msEntraUserNotSignedIn')}</p>
                </UnauthenticatedTemplate>
              </Typography>
              <UserProfile />
            </Box>
          </Shell>
        </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
