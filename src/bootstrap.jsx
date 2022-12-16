import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
import './services/i18n/i18n';
import App from './components/App/App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>
);
