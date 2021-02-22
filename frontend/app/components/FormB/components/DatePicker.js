import React from 'react'
import {
  DatePicker as MuiDatePicker,
} from '@material-ui/pickers'
import { getIn } from 'formik'
import { useDateFnsLocale } from 'utils/hooks'
//import { createErrorHandler } from './errorHandler';


export const fieldToDatePicker = ({
    field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
    form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
    disabled,
    onChange,
    onBlur,
    onError,
    ...props
  }) => {
    const fieldError = getIn(errors, field.name);
    const showError = getIn(touched, field.name) && !!fieldError;
  
    return {
      error: showError,
      helperText: showError ? fieldError : props.helperText,
      disabled: disabled ?? isSubmitting,
      onChange:
        onChange ??
        function (date) {
          setFieldValue(field.name, date);
        },
      onBlur:
        onBlur ??
        function (e) {
          fieldOnBlur(e ?? field.name);
        },
      onError:
        onError ?? createErrorHandler(fieldError, field.name, setFieldError),
      ...field,
      ...props,
    };
  }
  
  export default ({ children, ...props }) => {
    const { mask } = useDateFnsLocale()
    return (
      <MuiDatePicker mask={mask} {...fieldToDatePicker(props)}>{children}</MuiDatePicker>
    )
  }