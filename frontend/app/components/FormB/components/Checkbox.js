import React from 'react'
import MuiCheckbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

/**
 * Exclude props that are passed directly to the control
 * https://github.com/mui-org/material-ui/blob/v3.1.1/packages/material-ui/src/FormControlLabel/FormControlLabel.js#L71
 */

export const fieldToCheckbox = ({
    disabled,
    field: { onBlur: fieldOnBlur, ...field },
    form: { isSubmitting, setFieldValue },
    type,
    onChange,
    onBlur,
    ...props
  }) => {
    const indeterminate = !Array.isArray(field.value) && field.value == null;
    /*
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        type === 'checkbox',
        `property type=checkbox is missing from field ${field.name}, this can caused unexpected behaviour`
      );
    }
    */

    const {
      onChange: _onChange,
      ...fieldSubselection
    } = field;

    return {
      disabled: disabled ?? isSubmitting,
      indeterminate,
      checked: field.value,
      onChange:
        function (event, value) {
          setFieldValue(field.name, value);
          onChange && onChange(event)
        },
      onBlur:
        onBlur ??
        function (e) {
          fieldOnBlur(e ?? field.name);
        },
      ...fieldSubselection,
      ...props,
    };
  }
  
export default ({
    formProps,
    label,
  ...props
}) => {
  return (
      <FormControl
      {...formProps}
    >
    <FormControlLabel
      control={<MuiCheckbox {...fieldToCheckbox(props)} />}
      label={label}
    />
    </FormControl>
  );
}