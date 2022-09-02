import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.scss';
import ExampleComponent from '../ExampleComponent/ExampleComponent';
import theme from '../../services/theme/theme';
/* Include if language buttons required
import i18n from '../../services/i18n/i18n';
*/

function App() {
  /* Code below to change the language when language buttons are clicked
    const handleOnclick = e => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };
  */

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        <div className="App">
          {/* Language buttons should translations need to be checked, and changing browser language is not desired
        <div>
          <button value="af" onClick={handleOnclick} type="submit">
            Afrikaans
          </button>
          <button value="en" onClick={handleOnclick} type="submit">
            English
          </button>
        </div>
        */}

          <ExampleComponent id="exampleComponentId" />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
