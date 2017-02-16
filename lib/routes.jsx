import React from 'react';
import {
  Route,
  IndexRedirect,
} from 'react-router';
import App        from './containers/App';
import StreamTabs from './containers/StreamTabs';

const routes = (
  <Route path='/' component={App}>
    <IndexRedirect to='/streams' />
    <Route path='/streams(/**)' component={StreamTabs} />
  </Route>
);

export default routes;
