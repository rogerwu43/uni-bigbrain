import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from './App';
import './index.css';
import StoreProvider from './util/Store';
import history from './util/History';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreProvider>
        <App/>
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
