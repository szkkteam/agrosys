import React, { forwardRef, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Grid,
    ButtonGroup 
} from '@material-ui/core';

import { 
    ToggleButtonGroup,
    ToggleButton
} from '@material-ui/lab';

import './tabsbutton.scss'

const TabButtonGroup = styled(forwardRef((props, ref) => <ToggleButtonGroup ref={ref} {...props} />))`
    ${({theme}) => `
    width: 100%;
    padding: 15px 0;
    button {
        width: 100%;
        padding: 5px 10px;
        border-radius: 10px;

        &.MuiToggleButton-root.Mui-selected {
            color: ${theme.palette.primary.contrastText};
            background-color: ${theme.palette.primary.main};
        }
    }
    `}
`


const TabsButton = forwardRef(({
    values,
    defaultValue,
    onChange,
    className="",
    ...props
}, ref) => {

    const handleChange = (e, v) => {
        onChange && onChange(v)
    }

    return (
        <TabButtonGroup
            ref={ref}
            value={defaultValue}
            exclusive
            onChange={handleChange}
            {...props}
        >
            { values && values.map(({value, message}, index) => (
                <ToggleButton
                    key={index}
                    value={value}
                >
                    <FormattedMessage {...message} />
                </ToggleButton>
            )) }
        </TabButtonGroup>
    )
})

TabsButton.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        message: PropTypes.object.isRequired,
    })).isRequired,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export default TabsButton