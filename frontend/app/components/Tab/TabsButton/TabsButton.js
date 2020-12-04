import React, { forwardRef, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import {
    Grid,
    ButtonGroup 
} from '@material-ui/core';

import { 
    ToggleButtonGroup,
    ToggleButton
} from '@material-ui/lab';

import './tabsbutton.scss'

const Buttons = ({
    values,
    ...props
}) => (
    <Grid
        container
    >
        { values && values.map(({value, message}, index) => (
            <Grid key={index} item xs={12/values.length}>
                <ToggleButton
                    value={value}
                >
                    <FormattedMessage {...message} />
                </ToggleButton>
            </Grid>
        )) }
    </Grid>
)

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
        <ToggleButtonGroup
            ref={ref}
            className={`tabs-button-container ${className}`}
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
        </ToggleButtonGroup>
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