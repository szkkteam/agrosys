import React, { useMemo } from 'react'
import classnames from 'classnames'
import startCase from 'lodash/startCase'
import Field from 'redux-form/es/Field'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
  FormControl,
  RadioGroup,
} from '@material-ui/core' 


export default ({
    label,
    input,
    formLabel=NormalModuleReplacementPlugin,
    formProps,
    children,
    ...props
}) => {

    return (
        <FormControl 
            component="fieldset"
            {...formProps}
        >
            {formLabel}
            <RadioGroup 
                {...input}
                {...props}
            >
                {children}                
            </RadioGroup>
        </FormControl>
    )
}