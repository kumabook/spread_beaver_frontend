/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import qs                   from 'qs';
import React                from 'react';
import express              from 'express';
import favicon              from 'serve-favicon';
import { renderToString }   from 'react-dom/server';
import { createStore }      from 'redux';
import { Provider }         from 'react-redux';
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig        from '../webpack.config';
import reducers             from './reducers';
import App                  from './containers/App';

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>title</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const params         = qs.parse(req.query);
  const preloadedState = { params };
  const store          = createStore(reducers, preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const finalState = store.getState();
  res.send(renderFullPage(html, finalState));
}

const app      = express();
const port     = 3000;
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo:     true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(favicon(__dirname + '/../static/favicon.ico'));
app.use(webpackHotMiddleware(compiler));
app.use(handleRender);
app.listen(port);
