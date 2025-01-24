import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { fullHeight } from '../../utils/constants';
import { UserProfile } from '../UserProfile/UserProfile';

const UserDetails = () => {
  const { t } = useTranslation('authentication');

  return (
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
  );
};

export default UserDetails;
