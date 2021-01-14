import React, { useMemo } from 'react'
import classnames from 'classnames'
import startCase from 'lodash/startCase'
import Field from 'redux-form/es/Field'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
  FormHelperText,
  Select,
  InputLabel,
  FormControl,
  TextField as MuiTextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
  Divider,
  ListSubheader
} from '@material-ui/core' 

import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  renderAutocomplete,
  renderTextField,
  renderTextWithUnit,
  renderDatePicker
} from './components'

export const EmailField = (props) =>
  <Field component={TextComponent} type="email" {...props} />
  //<Field component={_renderInput} type="email" {...props} />

export const HiddenField = (props) =>
  <Field component="input" type="hidden" {...props} />
 
export const PasswordField = (props) =>
  <Field component={TextComponent} type="password" autoComplete="current-password" {...props} />
  //<Field component={_renderInput} type="password" {...props} />

export const TextField = (props) =>
  <Field component={TextComponent} {...props} />

export const TextComponent = (props) =>
  renderTextField({...props})

export const TextWithUnitField = (props) => 
  <Field component={TextWithUnitComponent} {...props} />

export const TextWithUnitComponent = (props) => 
  renderTextWithUnit({...props})

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

export const DatePickerField = (props) =>
  <Field component={DatePickerComponent} {...props} />

export const DatePickerComponent = (props) => 
  renderDatePicker({...props})

export const SelectOption = React.forwardRef(({children, ...props}, ref) =>
  //<MenuItem {...props} ref={ref}>{children}</MenuItem>)
  // FIXME: Redux-Form is not working with not native select. No option given. It said  the MenuItem must be direct descendant of select, but still not working.
  <option {...props} ref={ref}>{children}</option>)

export const SelectOptionGrp = ({children, ...props}) => 
  <optgroup {...props} >{children}</optgroup>


const renderBooleanField = ({
  label,
  input,
  formProps,
  value: originalValue,
  onChange: originalOnChange,
  ...custom
}) => {

  const checkboxProps = {
    checked: input? input.value ? true : false : originalValue,
    onChange: input? input.onChange : originalOnChange
  }

  return (
    <FormControl
      {...formProps}
    >
      <FormControlLabel
        control={
          <Checkbox 
            {...checkboxProps}
          />}
        label={label}
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
