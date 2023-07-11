import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18nSkeleton from './services/i18n/i18n';
import { StoreProvider } from './services/stateStorage/store';
import App from './App/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.Suspense fallback="...is loading">
    <StoreProvider>
      <I18nextProvider i18n={i18nSkeleton}>
        <App />
      </I18nextProvider>
    </StoreProvider>
  </React.Suspense>
);
