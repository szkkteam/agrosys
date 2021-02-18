import React from 'react';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl'

export const fieldToRadioGroup = ({
  field: { onBlur: fieldOnBlur, ...field },
  form,
  onBlur,
  ...props
}) => {
  return {
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

export default ({
    formProps={},
    formLabel,
    children,
    ...props
}) => {

  return (
    <FormControl 
        component="fieldset"
        {...formProps}
    >
        {formLabel}
        <MuiRadioGroup 
            {...fieldToRadioGroup(props)}
        >
            {children}                
        </MuiRadioGroup>
    </FormControl>
  )

}

