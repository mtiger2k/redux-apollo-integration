import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import { withApollo, graphql, gql } from 'react-apollo';

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();
    //this.props.client.resetStore();
  }

  render() {
    return <Redirect to='/signin'/>
  }
}

export default connect(null, actions)(withApollo(Signout))