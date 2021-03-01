import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/modules/Dashboard';
import Quiz from '../pages/modules/Quiz';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Quiz} />
    <Route path="/quiz" exact component={Quiz} />
  </Switch>
);

export default Routes;
