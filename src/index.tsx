import 'sanitize.css';
import './index.css';
import './styles/fonts.css';

import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import ReactDOM from 'react-dom';

import packageJson from '../package.json';
import {ENV, SENTRY_DSN} from './config/common';
import reportWebVitals from './reportWebVitals';
import {loadTenantConfig} from './shared/services/tenant.service';

const dsn = SENTRY_DSN;

if (dsn) {
  Sentry.init({
    // TODO: Add sourcemap integration
    dsn,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
    environment: ENV,
    release: `nft-marketplace-client@${packageJson.version}`,
  });
}

(async () => {
  await loadTenantConfig();
  const {App} = require('./App');
  ReactDOM.render(<App />, document.getElementById('react_app'));
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
