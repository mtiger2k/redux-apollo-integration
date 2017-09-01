import React from 'react';
import {
  BrowserRouter as Router,
  Route,
//  Switch,
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

import createHistory from 'history/createBrowserHistory'
const history = createHistory()

export const routes = () => {

  return (
    <Router>
        <div>
          <Header/>
          <Route path="/" exact={true} component={Welcome}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/feature" component={Feature}/>
          <PrivateRoute path="/channelList" component={ChannelsListWithData}/>
          <PrivateRoute path="/channel/:channelId" component={ChannelDetails}/>
        </div>
    </Router>
  );
};

export default routes
export { history }