import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StreamTabs from './containers/StreamTabs';

const routes = (
  <Switch>
    <Route path="/streams">
      <StreamTabs />
    </Route>
  </Switch>
);

export default routes;
