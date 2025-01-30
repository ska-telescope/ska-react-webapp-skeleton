import React from 'react';
import { createRoot } from 'react-dom/client';
import './services/i18n/i18n';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { AuthProvider } from '@ska-telescope/ska-login-page';
// import { MSENTRA_CLIENT_ID, MSENTRA_TENANT_ID, MSENTRA_REDIRECT_URI } from './utils/constants';

// TODO : USE THE ABOVE 

import App from './components/App/App';
import Loader from './components/Loader/Loader';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.Suspense fallback={<Loader />}>
    <StoreProvider>
    <AuthProvider
        MSENTRA_CLIENT_ID="bdbd5ae8-b9ec-494a-a74d-39245a0af01b"
        MSENTRA_AUTHORITY="https://login.microsoftonline.com/78887040-bad7-494b-8760-88dcacfb3805"
        MSENTRA_REDIRECT_URI="http://localhost:8090/"
      >

        <App />
      </AuthProvider>
    </StoreProvider>
  </React.Suspense>
);
