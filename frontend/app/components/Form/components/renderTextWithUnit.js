import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import TextComponent from './renderTextField'
import SearchSelectComponent from './renderAutocomplete'

const Container = styled.div`
    display: flex;
    align-items: flex-end;
`

export default ({
    name,
    unitName,
    label,
    units,
    defaultUnit=null,
    input: { value = "", onChange, onBlur, ...inputRest } = {},

}) => {
    //const intl = useIntl()
    console.debug("value: ", value)
    const [unit, setUnit] = useState(defaultUnit)

    const convertToValue = (newValue = null, newUnit = null) => {
        return  {
            [name]: newValue ?? value,
            [unitName]: newUnit ?? unit
        }
        
    }

    const handleInputBlur = (event) => {
        const converted = convertToValue(event.target.value)
        //console.debug("onChange: ", converted)
        onBlur && onBlur(converted)
    }

    const handleInputOnChange = (event) => {
        const converted = convertToValue(event.target.value)
        //console.debug("onChange: ", converted)
        onChange && onChange(converted)

    }

    const handleUnitChange = (e, unit) => {
        setUnit(unit)
        const converted = convertToValue(null, unit)
        console.debug("converted: ", converted)
        //console.debug("onChange: ", converted)
        onChange && onChange(converted)
    }



    return (
        <Container>
            <TextComponent name={name}
                //label={intl.formatMessage(messages.cropType)}
                label={label}
                //variant="outlined"
                //variant="outlined"
                formProps={{style: { flexGrow: 2}}}
                value={value[name]}
                onChange={handleInputOnChange}
                onBlur={handleInputBlur}
                input={{...inputRest}}
                //idAccessor={(o) => o.id}
               
            />
            <SearchSelectComponent
                disableClearable={true}
                formProps={{style: {flexGrow: 0.5}}}
                options={units}
                onChange={handleUnitChange}
                value={unit}
                variant="filled"
                //idAccessor={(o) => o.id}
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.title}
            />
        </Container>
    )
}
