import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Signout from './signout'
import { PrivateRoute } from './require_auth'

import Layout from '../app/components/layout/Layout';

import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'
import SettingsPage from '../components/SettingsPage'
import FeaturePage from '../components/FeaturePage'
import ChannelsListPage from '../components/ChannelsListPage'
import ChannelDetailsPage from '../components/ChannelDetailsPage'

import HomePage from '../pages/HomePage'

const history = createHistory()

export const routes = () => {

  return (
    
    <Switch>
      <Route path="/signin" component={LoginPage}/>
      <Route path="/signout" component={Signout}/>
      <Route path="/signup" component={RegisterPage}/>
      <Layout>
      <PrivateRoute path="/" exact={true} component={HomePage}/>
      <PrivateRoute path="/settings" component={SettingsPage}/>
      <PrivateRoute path="/feature" component={FeaturePage}/>
      <PrivateRoute path="/channelList" component={ChannelsListPage}/>
      <PrivateRoute path="/channel/:channelId" component={ChannelDetailsPage}/>
      </Layout>
    </Switch>
    
  );
};

export default routes
export { history }