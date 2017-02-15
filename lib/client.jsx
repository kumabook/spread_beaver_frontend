/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import React           from 'react';
import { render }      from 'react-dom';
import { createStore } from 'redux';
import { Provider }    from 'react-redux';
import App             from './containers/App';
import reducers        from './reducers';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(reducers, preloadedState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
