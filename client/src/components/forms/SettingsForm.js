import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SettingsForm extends Component {

    render() {
        const { handleSubmit, submitting, successMsg } = this.props;

        return (
            <form onSubmit={handleSubmit}>
            {successMsg && <div className="alert alert-info">{successMsg}</div>}
            <div className="form-group">
            <label>用户名字</label>
            <Field name="dispName" component="input" placeholder="请输入用户名字" className="form-control"/>
            </div>
            <div className="form-group">
            <label>登录帐号</label>
            <Field name="username" component="input" placeholder="请输入登录帐号" disabled={true} className="form-control"/>
            </div>
            <div className="form-group">
            <label>角色</label>
            <Field name="role" component="input" placeholder="请输入角色" disabled={true} className="form-control"/>
            </div>
            <div className="form-group">
            <label>手机号</label>
            <Field name="mobileNo" component="input" placeholder="请输入手机号" className="form-control"/>
            </div>
            <div>
              <button type="submit" disabled={submitting} className="btn btn-primary btn-flat" >
                {submitting ? '正在提交' : '提交修改'}
              </button>
            </div>
            </form>
        );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'settings',
})(SettingsForm);
