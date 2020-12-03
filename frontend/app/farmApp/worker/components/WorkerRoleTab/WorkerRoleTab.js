import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'

import {
    Button,
    ButtonGroup 
} from '@material-ui/core';

import { 
    ToggleButtonGroup,
    ToggleButton
} from '@material-ui/lab';

import './workerroletab.scss'

const WorkerRoleTab = ({
    value,
    valueLeft,
    valueRight,
    onChange
}) => {

    const handleChange = (e, v) => {
        onChange && onChange(v)
    }

    return (
        <ToggleButtonGroup
            className="worker-subtab-container"
            value={value}
            exclusive
            onChange={handleChange}

        >
            <ToggleButton
                value={valueLeft}
            >
                <FormattedMessage {...messages.left} />
            </ToggleButton>
            <ToggleButton
                value={valueRight}
            >
                <FormattedMessage {...messages.right} />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

WorkerRoleTab.propTypes = {
    value: PropTypes.any.isRequired,
    valueLeft: PropTypes.any.isRequired,
    valueRight: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
}

export default WorkerRoleTab