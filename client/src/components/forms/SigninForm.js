import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderTextField } from './formHelpers'
//import { Link } from 'react-router-dom'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more'
  }
  return errors
}


class SigninForm extends Component {

	renderAlert() {
	    if (this.props.errorMessage) {
	      return <div className="alert alert-danger">
	        <strong>Oops: </strong>{this.props.errorMessage}
	      </div>
	    }
	}

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
			<div className="login-box">
			  <div className="login-logo">
			    <b>银保车贷系统</b>
			  </div>
			  <div className="login-box-body">
			    <p className="login-box-msg">请输入登录名和密码</p>
	            <form onSubmit={handleSubmit}>
	            {this.renderAlert()}
	                <Field name="username" type="text" component={renderTextField} label="登录名"/>
	                <Field name="password" type="password" component={renderTextField} label="密码"/>
	            <div className="row">
	                <div className="col-xs-4 pull-right">
	                    <button type="submit" disabled={submitting} className="btn btn-primary btn-block btn-flat">{submitting?'正在登录': '登录'}</button>
	                </div>
	            </div>
	            </form>

			    {/*<Link to="#">忘记密码</Link><br/>
			    <Link to="/signup" className="text-center">注册新用户</Link>*/}

			  </div>
			</div>
		);
    }
}

export default reduxForm({
  form: 'signin',
  validate
})(SigninForm)
