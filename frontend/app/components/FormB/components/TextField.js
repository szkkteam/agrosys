import React from 'react'
import MuiTextField from '@material-ui/core/TextField'
import { getIn } from 'formik'
import { useFormatError } from 'utils/hooks'

export const fieldToTextField = ({
    disabled,
    field: { onBlur: fieldOnBlur, ...field },
    form: { isSubmitting, touched, errors },
    onBlur,
    helperText,
    ...props
}) => {
    const fieldError = getIn(errors, field.name)
    const showError = getIn(touched, field.name) && !!fieldError

    const formattedError = useFormatError(fieldError)
    return {
        variant: props.variant,
        error: showError,
        helperText: showError ? formattedError : helperText,
        disabled: disabled ?? isSubmitting,
        onBlur:
          onBlur ??
          function (e) {
            fieldOnBlur(e ?? field.name);
          },
        ...field,
        ...props,
      }
}

export default ({children, ...props}) => {
    return <MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>
}