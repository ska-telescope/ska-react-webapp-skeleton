import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './services/i18n/i18n';
// import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
// import App from './App';
// import Loader from './components/Loader/Loader';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.Suspense fallback={<Loader />}>
//     <StoreProvider>
//       <App />
//     </StoreProvider>
//   </React.Suspense>
// );
