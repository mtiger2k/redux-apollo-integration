import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderTextField } from './formHelpers'
import { Link } from 'react-router-dom'

const validate = values => {
  const errors = {}
  if (!values.dispName) {
    errors.dispName = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.role) {
    errors.role = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more'
  }
  if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Must match password'
    }
  return errors
}

class SignupForm extends Component {

    renderAlert() {
      if (this.props.errorMessage) {
        return <div className="alert alert-danger">
          <strong>Oops: </strong>{this.props.errorMessage}
        </div>
      }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
          <div className="register-box">
            <div className="register-logo">
              <b>银保车贷系统</b>
            </div>

            <div className="register-box-body">
              <p className="login-box-msg">注册新用户</p>
              <form onSubmit={handleSubmit}>
              {this.renderAlert()}
                  <Field name="dispName" type="text" component={renderTextField} label="用户名"/>
                  <Field name="username" type="text" component={renderTextField} label="登录名"/>
                  <Field name="password" type="password" component={renderTextField} label="密码"/>
                  <Field name="confirm_password" type="password" component={renderTextField} label="确认密码"/>
              <div className="row">
                <div className="col-xs-8">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox"/>我已经阅读并同意<a>条款</a>
                    </label>
                  </div>
                </div>
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">注册</button>
                </div>
              </div>

              </form>

          <Link to="/signin" className="text-center">已经注册，点击登录。</Link>

        </div>
      </div>
    );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'signupForm',
    validate
})(SignupForm);
