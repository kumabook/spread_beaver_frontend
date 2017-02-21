/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import 'babel-polyfill';
import React                from 'react';
import { render }           from 'react-dom';
import { Provider }         from 'react-redux';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme        from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  match,
  Router,
  browserHistory,
} from 'react-router';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import {
  syncHistoryWithStore,
  routerMiddleware,
} from 'react-router-redux';
import routes   from './routes';
import reducers from './reducers';
import rootSaga from './sagas';

injectTapEventPlugin();
const preloadedState = window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();
const middleware     = applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware);
const store          = createStore(reducers, preloadedState, middleware);
const history        = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(rootSaga);
match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
  );
});
