import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/modules/Dashboard';
import Quiz from '../pages/modules/Quiz';
import Finished from '../pages/modules/Quiz/Finished';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/quiz" exact component={Quiz} />
    <Route path="/result" exact component={Finished} />
  </Switch>
);

export default Routes;
