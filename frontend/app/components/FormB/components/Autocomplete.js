import React from 'react'
import MuiAutocomplete from '@material-ui/lab/Autocomplete'
import MuiTextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { getIn } from 'formik'
import { useFormatError } from 'utils/hooks'

export const fieldToAutocomplete = ({
  disabled,
  field,
  form: { isSubmitting, setFieldValue },
  type,
  onChange,
  onBlur,
  freeSolo,
  ...props
}) => {
/* TODO: Maybe throw an error?
  if (process.env.NODE_ENV !== 'production') {
    if (props.multiple) {
      invariant(
        Array.isArray(field.value),
        `value for ${field.name} is not an array, this can caused unexpected behaviour`
      );
    }
  }
*/


  const {
    onChange: _onChange,
    onBlur: _onBlur,
    multiple: _multiple,
    ...fieldSubselection
  } = field;
  
  return {
    freeSolo,
    onBlur:
      onBlur ??
      function (event) {
        field.onBlur(event ?? field.name);
      },
    onChange:
      onChange ??
      function (_event, value) {
        setFieldValue(field.name, value);
      },
    disabled: disabled ?? isSubmitting,
    loading: isSubmitting,
    ...fieldSubselection,
    ...props,
  }
}

export default ({
    formProps={},
    inputParams={},
    options,
    getOptionLabel: propGetOptionLabel,
    ...props
}) => {
    
    const {
        field,
        form: { touched, errors },
        helperText        
    } = props

    const overrideGetOptionLabel = Array.isArray(options) && options.length && typeof(options[0]) == 'string'

    const defaultGetOptionLabel = (option) => 
        typeof option === 'object' && propGetOptionLabel? propGetOptionLabel(option) : ""
    
    const fieldError = getIn(errors, field.name)
    const showError = getIn(touched, field.name) && !!fieldError
    
    const formattedError = useFormatError(fieldError)

    return (
        <FormControl
          {...formProps}
        >
          <MuiAutocomplete
              options={options}
              getOptionLabel={overrideGetOptionLabel? propGetOptionLabel : defaultGetOptionLabel}
              {...fieldToAutocomplete(props)}
              renderInput={(params) => 
                  <MuiTextField 
                      autoComplete="disabled"
                      error={showError}
                      helperText={showError ? formattedError : helperText}
                      {...params}
                      {...inputParams}
                  />
              }
          />
        </FormControl>
      )
}
