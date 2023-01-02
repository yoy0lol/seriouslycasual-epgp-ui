import { HelmetProvider, Helmet } from 'react-helmet-async';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Helmet>
      <script>{`const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`}</script>
      <script src='https://wow.zamimg.com/js/tooltips.js'></script>
    </Helmet>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);
