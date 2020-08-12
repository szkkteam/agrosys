import React from 'react'
import classnames from 'classnames'
import startCase from 'lodash/startCase'
import Field from 'redux-form/es/Field'

import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

export const EmailField = (props) =>
  <Field component={_renderInput} type="email" {...props} />

export const HiddenField = (props) =>
  <Field component="input" type="hidden" {...props} />
 
export const PasswordField = (props) =>
  <Field component={_renderInput} type="password" {...props} />

export const TextField = (props) =>
  <Field component={_renderInput} type="text" {...props} />

export const TextArea = (props) =>
  <Field component={_renderTextArea} {...props} />

export const BooleanField = (props) =>
  <Field component={_renderInput} type="checkbox" {...props} />

export const SelectField = (props) =>
  <Field component={SelectComponent} {...props} />

export const SelectComponent = (props) =>
    renderSelectField({...props})

export const SelectOption = React.forwardRef(({children, ...props}, ref) =>
  <MenuItem {...props} ref={ref}>{children}</MenuItem>)


const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const renderSelectField = ({
  input = null,
  label,
  disabled = false,
  htmlFor = 'select-simple',
  inputName = 'select',
  formProps,
  labelProps,
  meta: { touched = null, error = null } = {},
  children,
  ...custom
}) => (
  <FormControl
    {...formProps}
    error={touched && error}
    disabled={disabled}
  >
    <InputLabel
      {...labelProps}
      htmlFor={htmlFor}
    >
      {label}
    </InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: inputName,
        id: htmlFor,
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

const _renderInput = (props) => _renderField({ component: 'input', ...props })

const _renderTextArea = (props) => _renderField({ component: 'textarea', ...props })

const _renderField = ({ component: Component, input, label, meta, required, ...props }) => {
  const { touched, error, warning } = meta

  const hasError = () => {
    if (touched && error) return 'error'
    if (touched && warning) return 'warning'
    return null
  }

  const { name } = input
  label = label || startCase(name)

  return (
    <div className={`row ${classnames({
      error: hasError() === 'error',
      warning: hasError() === 'warning',
    })}`}>
      <label htmlFor={name} className={classnames({ required })}>
        {label}
      </label>
      <Component id={name} {...input} placeholder={label} {...props} />
      {hasError() && <div className="help">{error || warning}</div>}
    </div>
  )
}
