import React from 'react'

export const  renderTextField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={(touched && error)?"form-group has-error" : "form-group"}>
        <label>{label}</label>
        <input placeholder={type} className="form-control" {...input} type={type}/>
        {touched && error && <span className="help-block">{error}</span>}
    </div>
)