import React, { useMemo } from 'react'
import messages from 'messages'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
    FormControl,
    TextField as MuiTextField,
    Button,
} from '@material-ui/core' 

import Autocomplete from '@material-ui/lab/Autocomplete';

const StyledButton = styled(Button)`
  width: 100%;
`

const NoOptionButton = ({
  title,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
        color="primary"
        //variant="outlined"
        onMouseDown={onClick}
        startIcon={
          <AddCircleOutlineIcon />
        }
      >
        <FormattedMessage {...title} />
      </StyledButton>
  )
}


export default ({
    input = null,
    label,
    disabled = false,
    formProps,
    getOptionLabel: propGetOptionLabel,
    // No option button
    noOptionButton=null,
    // Helper
    options,
    idAccessor=null,
    // Input specific props
    inputProps,
    variant,
    meta: { touched = null, error = null } = {},
    ...custom
}) => {
    const { onChange: onChangeRF, onBlur: onBlurRF, value, ...inputRest } = input || {}

    const defaultGetOptionLabel = (option) => 
        typeof option === 'object' && propGetOptionLabel? propGetOptionLabel(option) : ""


    const value2 = useMemo(() => 
        idAccessor? options.find(o => idAccessor(o) == value) : value
    , [value])

    const rfPropsFix = input
        ? {
            onChange: (e, v) => input.onChange(v? (idAccessor? idAccessor(v) : v) : ""), // Return with empty string if null value is passed
            //...idAccessor? { getOptionSelected: (o, v) => { /*console.debug("option: ", o, v, idAccessor(o) == v);*/ return idAccessor(o) == v} }: {},
        }
        : {}

  return (
        <FormControl
            error={touched && !!error }
            disabled={disabled}
            {...formProps}
        >
            <Autocomplete
                //open={true}
                autoHighlight
                freeSolo={false}
                //clearOnBlur={true}
                //autoSelect={true}
                {...rfPropsFix} // Used to fix the onChange event handler for redux-form
                options={options}
                getOptionLabel={defaultGetOptionLabel}
                value={value2? value2: ""} // Used because if the input is clreared it's returning with undefined
                noOptionsText={
                  noOptionButton? <NoOptionButton {...noOptionButton}/> : <FormattedMessage {...messages.emptyList} />
                }
                {...custom}        
                {...inputRest}
                renderInput={(params) => 
                <MuiTextField 
                    label={label}
                    autoComplete="disabled"
                    variant={variant}
                    {...params}
                    {...inputProps}
                />
                }
            />
        </FormControl>
  )
}
