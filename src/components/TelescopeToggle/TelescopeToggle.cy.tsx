import React from 'react';
import TelescopeToggle from './ToggleTelescope';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<ReactSkeleton />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme, () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <TelescopeToggle />
        </ThemeProvider>
      );
    });
  }
});
