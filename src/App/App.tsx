import React from 'react';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import { storageObject } from '../services/stateStorage';
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
        <Header data-testid="skaHeader" themeToggle={toggleTheme}>
          <Grid item />
          <Grid item>
            <Typography variant="h4">Project Tracking Tool</Typography>
          </Grid>
          <Grid item />
        </Header>
        <Paper>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container data-testid="ContainerId" />
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
        <Footer />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
