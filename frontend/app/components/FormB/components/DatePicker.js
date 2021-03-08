import React from 'react'
import {
  DatePicker as MuiDatePicker,
} from '@material-ui/pickers'
import { getIn } from 'formik'
import { useDateFnsLocale } from 'utils/hooks'
import { useFormatError } from 'utils/hooks'
//import { createErrorHandler } from './errorHandler';
import {
  TextField,
} from '@material-ui/core'

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
    const formattedError = useFormatError(fieldError)
  
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
        onError ?? formattedError,
      ...field,
      ...props,
    };
  }

export default ({
  fullWidth=false,
  variant,
  ...props
}) => {
  const { mask } = useDateFnsLocale()
  return (
    <MuiDatePicker 
      mask={mask}
      {...fieldToDatePicker(props)}
      renderInput={(props) => 
        <TextField
            variant={variant}
            fullWidth={fullWidth}
            {...props}
            //{...inputProps}
        />
    }
    />
  )
}