import React, { useRef, useMemo, useLayoutEffect, useState, Children } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { changeLocale } from 'site/actions'
import { useDispatch } from 'react-redux';

import Flags from 'country-flag-icons/react/3x2'

import {
    TextField,
    Paper,
    Select,
    MenuItem
}  from '@material-ui/core';

import { useLocale } from 'utils/hooks'

const countries = [
    { locale: 'hu-HU', code: 'HU', label: 'Magyar', Flag: Flags.HU },
    { locale: 'en-US', code: 'US', label: 'English', Flag: Flags.US },
]

const StyledMenuItem = styled(MenuItem)`
        font-size: 15px;
        & > svg {
            width: 20px;
            margin-right: 10px;
        }
`


const StyledSelect = styled(Select)`
        .MuiSelect-select {
            font-size: 15px;
            & > svg {
                width: 20px;
                margin-right: 10px;
            }
        }

`

const LanguageSelector = ({

}) => {
    const locale = useLocale()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(changeLocale(e.target.value))
    }

    return (
        <StyledSelect
            //variant="standard"
            value={locale}
            onChange={handleChange}
        >
            { countries.map(({code, locale, label, Flag}, i) => (
                <StyledMenuItem
                    key={`locale-${code}-${i}`}
                    value={locale}
                >
                    <Flag />
                    {label}
                </StyledMenuItem>
            ))}
        </StyledSelect>            
    )
}
/*
<Autocomplete
            disablePortal={true}
            disableClearable={true}
            id="country-select-demo"
            style={{ width: 300 }}
            options={countries}
            PaperComponent={StyledPaper}
            value={defaultLocale}
           autoHighlight
           getOptionLabel={(option) => option.label}
           renderOption={(option) => (
               <React.Fragment>
               <span>{countryToFlag(option.code)}</span>
               {option.label} ({option.code})
               </React.Fragment>
           )}
           renderInput={(params) => (
               <TextField
               {...params}
               label={intl.formatMessage(messages.default)}
               variant="outlined"
               inputProps={{
                   ...params.inputProps,
                   autoComplete: 'new-password', // disable autocomplete and autofill
               }}
               />
           )}
           onChange={handleChange}
       />
*/
LanguageSelector.propTypes = {

}

export default LanguageSelector