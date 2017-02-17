import { browserHistory }   from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import {
  applyMiddleware,
  createStore,
} from 'redux';
import reducers from '../lib/reducers';

export default () => {
  const middleware = routerMiddleware(browserHistory);
  return createStore(reducers, applyMiddleware(middleware));
};
