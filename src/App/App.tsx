import React from 'react';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '../services/stateStorage/store';
import theme from '../services/theme/theme';
import Container from '../components/Container/Container';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 90;

function App() {
  const { themeMode, toggleTheme } = storageObject.useStore();

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        {
          // Header container :
          // Even distribution of the children is built in
          // Logo with URL link included
          // Button for light/dark mode included, and sample implementation provided.
        }
        <Header data-testid="skaHeader" themeToggle={toggleTheme}>
          <Grid item />
          <Grid item>
            <Typography variant="h4">Project Tracking Tool</Typography>
          </Grid>
          <Grid item />
        </Header>
        <Paper>
          {
            // Example of the spacer being used to shift content from behind the Header component
          }
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          {
            // This is the ONLY component that is accessible via micro-frontend implementation
          }
          <Container data-testid="ContainerId" />
          {
            // Example of the spacer being used to stop content from being hidden behind the Footer component
          }
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        {
          // Footer container :
          // Even distribution of the children is built in
        }
        <Footer>
          <Grid item />
          <Grid item alignItems="center" justifyContent="center">
            {/* <TelescopeToggle /> */}
          </Grid>
          <Grid item />
        </Footer>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
