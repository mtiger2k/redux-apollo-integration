import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../components/header'
import Welcome from '../components/welcome'
import Signin from '../components/auth/signin'
import Signout from '../components/auth/signout'
import Signup from '../components/auth/signup'
import { PrivateRoute } from '../components/auth/require_auth'
import Feature from '../components/feature'
import ChannelsListWithData from '../components/ChannelsListWithData'
import ChannelDetails from '../components/ChannelDetails'

import Layout from '../app/components/layout/Layout';
import Home from '../components/home'
import FeaturePage from '../components/FeaturePage'
import ChannelsListPage from '../components/ChannelsListPage'
import ChannelDetailsPage from '../components/ChannelDetailsPage'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()

export const routes = () => {

  return (
    
    <Switch>
      <Route path="/signin" component={Signin}/>
      <Route path="/signout" component={Signout}/>
      <Route path="/signup" component={Signup}/>
      <Layout>
      <Route path="/" exact={true} component={Home}/>
      <PrivateRoute path="/feature" component={FeaturePage}/>
      <PrivateRoute path="/channelList" component={ChannelsListPage}/>
      <PrivateRoute path="/channel/:channelId" component={ChannelDetailsPage}/>
      </Layout>
    </Switch>
    
  );
};

export default routes
export { history }