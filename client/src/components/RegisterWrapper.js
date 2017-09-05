import React, { Component, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node,
};

export default class RegisterBox extends Component {
  componentWillMount() {
    window.$('body').addClass('hold-transition register-page');
  }

  render() {
    return (
      <div className="login-box">
        {this.props.children}
      </div>
    );
  }
}

RegisterBox.propTypes = propTypes;
