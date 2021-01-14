import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { useDateFnsLocale } from 'utils/hooks'

import MomentUtils from '@material-ui/pickers/adapter/moment';
import { LocalizationProvider } from '@material-ui/pickers';

import { DatePicker } from "@material-ui/pickers";
import {
    TextField
} from '@material-ui/core'

export default ({
    input={},
    inputProps,
    ...props
}) => {
    const locale = useDateFnsLocale()
    console.debug("Locale: ", locale)

    const [value, setValue] = React.useState(new Date());
    return (
        <LocalizationProvider dateAdapter={MomentUtils} locale={locale}>
            <DatePicker
                label="Basic example"
                
                value={value}
                onChange={(newValue) => {
                    console.debug("newValue: ", newValue)
                    setValue(newValue)}
                }
                //{...input}
                //{...props} 
                renderInput={(props) => 
                    <TextField 
                        {...props}
                        //{...inputProps}
                    />
                }
            />
        </LocalizationProvider>  
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