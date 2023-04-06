import React from 'react';
import { CssBaseline, Grid, Paper, ThemeProvider } from '@mui/material';
import { Footer, Header, Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import ExampleComponent from '../ExampleComponent/ExampleComponent';
import theme, { THEME_DARK, THEME_LIGHT } from '../../services/theme/theme';

const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 90;

export interface AppProps {
  user?: { username: string };
  telescope?: { name: string };
}

function App({ user, telescope }: AppProps) {
  // Theme related
  const [themeMode, setThemeMode] = React.useState(THEME_LIGHT);

  const themeToggle = () => {
    setThemeMode(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
  };

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        {
          // Header container :
          // Even distribution of the children is built in
          // Logo with URL link included
          // Button for light/dark mode included, and sample implementation provided.
        }
        <Header id="theHeader" themeToggle={themeToggle}>
          <Grid item>THIS</Grid>
          <Grid item>IS</Grid>
          <Grid item>THE</Grid>
          <Grid item>Header</Grid>
        </Header>
        <Paper>
          {
            // Example of the spacer being used to shift content from behind the Header component
          }
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          {
            // ExampleComponent :
            // This is the ONLY element that is currently able be accessed via micro-frontend implementation
          }
          <ExampleComponent
            id="exampleComponentId"
            data-testid="exampleComponentId"
            telescope={telescope}
            user={user}
          />
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
          <Grid item>THIS</Grid>
          <Grid item>IS</Grid>
          <Grid item>THE</Grid>
          <Grid item>FOOTER</Grid>
        </Footer>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
