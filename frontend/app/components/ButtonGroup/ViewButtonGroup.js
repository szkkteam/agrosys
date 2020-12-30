import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab'

const LinkToggleButton = withLinkComponent(ToggleButton)

const ViewButtonGroup = ({
    items,
    handleChange,
    ...props
}) => {

    const onClick = (e, v) => {
        handleChange && handleChange(v)
    }

    const location = useLocation()

    return (
        <ToggleButtonGroup
            value={location.hash}
            exclusive
            onChange={onClick}
            aria-label="block view"
            {...props}
        >
            { items && items.map(({value, icon: Icon}, i) => (
                <LinkToggleButton key={i} to={{...location, hash: value}} value={value} aria-label={value}>
                    <Icon />
                </LinkToggleButton>                
            ))}
        </ToggleButtonGroup>
    )
}

ViewButtonGroup.propTyes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        icon: PropTypes.element,
    })).isRequired,
    handleChange: PropTypes.func
}

export default ViewButtonGroup