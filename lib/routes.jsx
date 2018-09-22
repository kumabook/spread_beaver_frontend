import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StreamTabs from './containers/StreamTabs';

const routes = (
  <Switch>
    <Route path="/streams">
      <StreamTabs />
    </Route>
    <Redirect to="/streams/tag/global.latest" />
  </Switch>
);

export default routes;
