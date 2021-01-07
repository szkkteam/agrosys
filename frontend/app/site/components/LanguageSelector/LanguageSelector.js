import React, { useRef, useMemo, useLayoutEffect, useState, Children } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { changeLocale } from 'site/actions'
import { useDispatch } from 'react-redux';

import {
    TextField,
    Paper,
    Select,
    MenuItem
}  from '@material-ui/core';
import {
    Autocomplete
} from '@material-ui/lab'

import { useLocale } from 'utils/hooks'

const countries = [
    { locale: 'hu-HU', code: 'HU', label: 'Magyar', phone: '36' },
    { locale: 'en-US', code: 'US', label: 'English', phone: '1' },
]

const countryToFlag = (isoCode) => {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
}

const StyledMenuItem = styled(MenuItem)`
        font-size: 15px;
        & > span {
            margin-right: 10px;
            font-size: 18px;
        }
`


const StyledSelect = styled(Select)`
        .MuiSelect-select {
            font-size: 15px;
            & > span {
                margin-right: 10px;
                font-size: 18px;
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
            { countries.map((option, i) => (
                <StyledMenuItem
                    key={`locale-${option.code}-${i}`}
                    value={option.locale}
                >
                    <span>{countryToFlag(option.code)}</span>
                    {option.label}
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