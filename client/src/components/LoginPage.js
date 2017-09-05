import React, { Component } from 'react'
import * as actions from '../actions/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginWrapper from './LoginWrapper'
import SigninForm from './forms/SigninForm'

class LoginPage extends Component {

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError(null)
    }
  }

  displayRedirectMessages() {
    const location = this.props.location
    return location.state && <div className="alert alert-danger">{location.state.message}</div>
  }

  handleSubmit({username, password}) {
    this.props.signinUser({username, password})
  }

  getRedirectPath() {
    const locationState = this.props.location.state
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname // redirects to referring url
    } else {
      return '/'
    }
  }

  render() {
    return (this.props.authenticated) ?
      <Redirect to={{
        pathname: this.getRedirectPath(), state: {
          from: this.props.location
        }
      }}/>
      :
      <LoginWrapper>
        {/*this.displayRedirectMessages()*/}
        <SigninForm onSubmit={this.handleSubmit.bind(this)} errorMessage={this.props.errorMessage}/>
      </LoginWrapper>
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(LoginPage)