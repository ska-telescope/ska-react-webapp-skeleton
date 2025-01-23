import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Drawer, Grid, Stack } from '@mui/material';

import { ButtonLogout } from '@ska-telescope/ska-gui-components';

export interface UserProps {
  open: boolean;
  toggleDrawer: Function;
}

export default function User({ open, toggleDrawer }: UserProps) {
  const { t } = useTranslation('authentication');
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box m={1} sx={{ minWidth: '25vw' }}>
          <Stack sx={{ height: '95%' }} spacing={2}>
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid item>
                <ButtonLogout label={t('button.signOut')} />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
