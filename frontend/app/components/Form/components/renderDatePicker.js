import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { useDateFnsLocale } from 'utils/hooks'

import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider } from '@material-ui/pickers';

import { DatePicker } from "@material-ui/pickers";
import {
    TextField,
    FormControl
} from '@material-ui/core'



export default ({
    input={},
    inputProps,
    formProps,
    ...props
}) => {
    const { mask } = useDateFnsLocale()
    console.debug("Locale: ", locale)

    //const [value, setValue] = React.useState(new Date());
    //console.debug("Date value: ", value)
    return (
        <FormControl
            {...formProps}
        >
            <DatePicker
                mask={mask}
                label="Basic example"
                allowSameDateSelection
                //value={value}
                /*
                onChange={(newValue) => {
                    console.debug("newValue: ", newValue)
                    setValue(newValue)}
                }
                */
                {...input}
                {...props} 
                renderInput={(props) => 
                    <TextField 
                        {...props}
                        //{...inputProps}
                    />
                }
            />
        </FormControl>
    )
}

/*
<DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                //{...input}
                //{...props} 
                renderInput={(props) => 
                    <TextField 
                        {...props}
                        {...inputProps}
                    />
                }
            />
*/