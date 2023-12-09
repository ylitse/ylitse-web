import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import './i18n';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={setupStore({})}>
      <BrowserRouter basename={BASE_PATH || '/'}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
