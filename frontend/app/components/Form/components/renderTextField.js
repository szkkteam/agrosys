import React, { useMemo } from 'react'
import classnames from 'classnames'
import startCase from 'lodash/startCase'
import Field from 'redux-form/es/Field'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
  FormControl,
  TextField as MuiTextField,
} from '@material-ui/core' 

export default ({
  label,
  input,
  formProps,
  meta: { touched = null, invalid = null, error = null } = {},
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
