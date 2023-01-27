import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.scss';
// import ExampleComponent from '../ExampleComponent/ExampleComponent';
import Form from '../Form/Form';
import theme from '../../services/theme/theme';

// eslint-disable-next-line react/prop-types, no-unused-vars
function App({ user, telescope }) {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        <div className="App">
          <Form />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
