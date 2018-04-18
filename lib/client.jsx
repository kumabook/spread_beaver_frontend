/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import 'babel-polyfill';
import React from 'react';
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { I18nextProvider } from 'react-i18next';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import routes from './routes';
import reducers from './reducers';
import rootSaga from './sagas';
import App from './containers/App';
import en from './locales/en/translation.json';
import ja from './locales/ja/translation.json';

const debug = process.env.NODE_ENV === 'develop';

i18next.use(LngDetector).init({
  debug,
  fallbackLng: {
    'ja-JP': ['ja'],
    default: ['en'],
  },
  detection: {
    order: ['querystring', 'cookie', 'navigator', 'htmlTag'],
    caches: ['cookie'],
  },
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
});

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));
injectTapEventPlugin();
const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(reducers, preloadedState, middleware);
sagaMiddleware.run(rootSaga, i18next, history);

hydrate(
  <I18nextProvider i18n={i18next}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App>{routes}</App>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
);
