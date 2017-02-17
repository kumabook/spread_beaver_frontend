import React from 'react';
import {
  Route,
  IndexRedirect,
} from 'react-router';
import App        from './containers/App';
import StreamTabs from './containers/StreamTabs';
import StreamGrid from './containers/StreamGrid';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/streams" />
    <Route path="streams" component={StreamTabs}>
      <Route path="**" component={StreamGrid} />
    </Route>
  </Route>
);

export default routes;
