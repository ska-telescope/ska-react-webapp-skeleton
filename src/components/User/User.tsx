import React from 'react';
import { Box, Drawer, Grid2 as Grid, Stack } from '@mui/material';

import useTheme from '@mui/material/styles/useTheme.js';
import { ButtonLogout } from '@ska-telescope/ska-login-page';

export interface UserProps {
  open: boolean;
  toggleDrawer: Function;
}

export default function User({ open, toggleDrawer }: UserProps) {
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box m={1} sx={{ minWidth: '25vw' }}>
          <Stack sx={{ height: '95%' }} spacing={2}>
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid size={12}>
                <ButtonLogout
                  colorBG={useTheme().palette.primary.light}
                  colorFG={useTheme().palette.primary.contrastText}
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
