import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/auth'
import { Redirect } from 'react-router-dom'

import RegisterWrapper from './RegisterWrapper'
import SignupForm from './forms/SignupForm'

class RegisterPage extends Component {

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError(null)
    }
  }

  handleSubmit({username, password, dispName, mobileNo}) {
    this.props.signupUser({username, password, dispName, mobileNo})
  }

  getRedirectPath() {
    const locationState = this.props.location.state
    if (locationState && locationState.from.pathname) {
      return locationState.from.pathname
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
      <RegisterWrapper>
        <SignupForm onSubmit={this.handleSubmit.bind(this)} errorMessage={this.props.errorMessage}/>
      </RegisterWrapper>
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(RegisterPage)