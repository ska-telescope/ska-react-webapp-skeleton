import React from 'react';
import { Box, Typography } from '@mui/material';
import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { fullHeight } from '../../utils/constants';
import { UserProfile } from '../UserProfile/UserProfile';

const UserDetails = () => (
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
      Using MSEntra
    </Typography>
    <Typography component="h1" variant="h5">
      <MsalAuthenticationTemplate interactionType={InteractionType.None}>
        <p>User is signed in</p>
      </MsalAuthenticationTemplate>
      <UnauthenticatedTemplate>
        <p>User is NOT signed in</p>
      </UnauthenticatedTemplate>
    </Typography>
    <UserProfile />
  </Box>
);

export default UserDetails;
