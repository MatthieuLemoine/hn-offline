import React from 'react';
import { Route, NativeRouter, Switch, BackButton } from 'react-router-native';
import Articles from '../../containers/Articles';
import Article from '../../containers/Article';
import Login from '../../containers/Login';

const Application = () => (
  <NativeRouter>
    <BackButton>
      <Switch>
        <Route path="/articles" component={Articles} />
        <Route path="/article/:id" component={Article} />
        <Route path="/login" component={Login} />
        <Route component={Articles} />
      </Switch>
    </BackButton>
  </NativeRouter>
);

Application.propTypes = {};

export default Application;
