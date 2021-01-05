import React from 'react'
import classnames from 'classnames'
import startCase from 'lodash/startCase'
import Field from 'redux-form/es/Field'

import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField as MuiTextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const EmailField = (props) =>
  <Field component={_renderInput} type="email" {...props} />

export const HiddenField = (props) =>
  <Field component="input" type="hidden" {...props} />
 
export const PasswordField = (props) =>
  <Field component={TextComponent} type="password" autoComplete="current-password" {...props} />
  //<Field component={_renderInput} type="password" {...props} />

export const TextField = (props) =>
  <Field component={TextComponent} {...props} />

export const TextComponent = (props) =>
  renderTextField({...props})

export const TextArea = (props) =>
  <Field component={TextAreaComponent} {...props} />

  export const TextAreaComponent = (props) =>
    renderTextField({multiline: true, ...props})

export const BooleanField = (props) =>
  <Field component={BooleanComponent} {...props} />

export const BooleanComponent = (props) => 
  renderBooleanField({...props})

export const SelectField = (props) =>
  <Field component={SelectComponent} {...props} />

export const SelectComponent = (props) =>
  renderSelectField({...props})

export const SearchSelectField = (props) =>
  <Field component={SearchSelectComponent} type="text" {...props}/>

export const SearchSelectComponent = (props) =>
  renderAutocomplete({...props})

export const SelectOption = React.forwardRef(({children, ...props}, ref) =>
  //<MenuItem {...props} ref={ref}>{children}</MenuItem>)
  // FIXME: Redux-Form is not working with not native select. No option given. It said  the MenuItem must be direct descendant of select, but still not working.
  <option {...props} ref={ref}>{children}</option>)

export const SelectOptionGrp = ({children, ...props}) => 
  <optgroup {...props} >{children}</optgroup>

const renderTextField = ({
  label,
  input,
  formProps,
  meta: { touched, invalid, error, dirty, pristine, initial, autofilled },
  ...custom
}) => {
  //console.log("Label: " + label + " touched: ", touched, " invalid: " + invalid + " dirty: ", dirty, " pristine: ", pristine, " autofilled: ", autofilled, " initial: ", initial)
  return (
    <FormControl
      {...formProps}
    >
      <MuiTextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
    </FormControl>
  )
}


const renderBooleanField = ({
  label,
  input,
  formProps,
  ...custom
}) => {
  return (
    <FormControl
      {...formProps}
    >
      <FormControlLabel
        control={
          <Checkbox 
            checked={input.value ? true : false}
            onChange={input.onChange}
          />}
        label={label}
      />
    </FormControl>
  )
}

const renderAutocomplete = ({
  input = null,
  label,
  disabled = false,
  textProps,
  formProps,
  meta: { touched = null, error = null } = {},
  ...custom
}) => {
  const { onChange: onChangeRF, onBlur: onBlurRF, ...inputRest } = input || {}

  const rfPropsFix = input? { onChange: (e, v) => input.onChange(v) } : {}
  return (
    <FormControl
      {...formProps}
      error={touched && !!error }
      disabled={disabled}
    >
      <Autocomplete
        autoHighlight
        freeSolo={false}
        fullWidth={true}
        clearOnBlur={true}
        autoSelect={true}
        {...rfPropsFix} // Used to fix the onChange event handler for redux-form
        
        {...custom}        
        {...inputRest}
        renderInput={(params) => <MuiTextField {...params} label={label} {...textProps} autoComplete="disabled" fullWidth/>}
      />
    </FormControl>
  )
}

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
}) => {
  return (
    <FormControl
      {...formProps}
      error={touched && !!error }
      disabled={disabled}
    >
      {label? <InputLabel
        {...labelProps}
        htmlFor={htmlFor}
      >
        {label}
      </InputLabel> : null }
      <Select
        // FIXME: Without native, it's not working properly. See menuitem issue.
        // Consider using: https://github.com/erikras/redux-form-material-ui or Formik
        native
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
}
  

  
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
