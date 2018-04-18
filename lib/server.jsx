/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import moment from 'moment';
import md5File from 'md5-file';
import serialize from 'serialize-javascript';
import React from 'react';
import { Helmet } from 'react-helmet';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import i18nextMiddleware, {
  LanguageDetector,
} from 'i18next-express-middleware';
import compression from 'compression';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import favicon from 'serve-favicon';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { StaticRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import webpackConfig from '../webpack.config';
import routes from './routes';
import reducers from './reducers';
import rootSaga from './sagas';
import NeedRedirectError from './utils/need_redirect_error';
import App from './containers/App';
import en from './locales/en/translation.json';
import ja from './locales/ja/translation.json';

const isDevelop = process.env.NODE_ENV !== 'production';

const staticMaxAge = '30d';
const htmlMaxAge = moment.duration(15, 'm').asSeconds();
const htmlSMaxAge = moment.duration(60, 'm').asSeconds();

const cacheControl = `public, max-age=${htmlMaxAge}, s-maxage=${htmlSMaxAge}`;

const jsVersion = isDevelop ? Date.now() : md5File.sync('./static/bundle.js');
const cssVersion = isDevelop ? Date.now() : md5File.sync('./static/bundle.css');

function renderFullPage(html, helmet, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link rel="stylesheet" href="/static/bundle.css?version=${cssVersion}" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(preloadedState)};
        </script>
        <script async src="/static/bundle.js?version=${jsVersion}"></script>
      </body>
    </html>
  `;
}

function renderError(e) {
  return `<html><p>${e.message}</p><pre>${e.stack}</pre></html>`;
}
function handleRender(req, res) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);

  global.navigator = global.navigator || {};
  global.navigator.userAgent = req.headers['user-agent'] || 'all';

  const context = {};
  const store = createStore(reducers, middleware);
  const root = (
    <I18nextProvider i18n={req.i18n}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App>{routes}</App>
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </I18nextProvider>
  );
  sagaMiddleware
    .run(rootSaga, req.i18n)
    .done.then(() => {
      const html = renderToString(root);
      const helmet = Helmet.renderStatic();
      const finalState = store.getState();
      if (!isDevelop) {
        res.setHeader('Cache-Control', cacheControl);
      }
      res.send(renderFullPage(html, helmet, finalState));
    })
    .catch(e => {
      if (e instanceof NeedRedirectError) {
        res.redirect(e.path);
        return;
      }
      res.status(500).send(renderError(e));
    });
  store.dispatch({ type: 'locale', payload: req.i18n.t('locale') });
  store.dispatch({ type: 'url', payload: req.url });
  store.dispatch(END);
}

i18next.use(LanguageDetector).init(
  {
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    fallbackLng: {
      'ja-JP': ['ja'],
      default: ['en'],
    },
    detection: {
      order: ['querystring', 'cookie', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
  },
  () => {}
);

const app = express();
const port = process.env.PORT || 4000;
const compiler = webpack(webpackConfig);
if (process.env.NODE_ENV !== 'production') {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));
}
const staticDir = `${__dirname}/../static`;
app.use(compression());
app.use(favicon(`${staticDir}/favicon.ico`, { maxAge: staticMaxAge }));

app.use(
  '/static',
  expressStaticGzip('static', { enableBrotli: true, maxAge: staticMaxAge })
);
app.use(i18nextMiddleware.handle(i18next));
app.use(handleRender);
app.listen(port);
