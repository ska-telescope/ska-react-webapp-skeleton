import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
import './services/i18n/i18n';
import { StoreProvider } from './services/stateStorage/store'; 
import App from './App/App';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Suspense fallback="...is loading">
    <StoreProvider>
      <App />
    </StoreProvider>
  </Suspense>
);
