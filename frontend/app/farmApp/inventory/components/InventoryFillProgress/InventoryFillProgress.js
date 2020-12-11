import React, { useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'

import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * 
 * @param {current} current value of the progress
 * @param {max} maximum value where it can go
 * @param {unit} unit of the fill progress
 * 
 * If unit is not give, it will just display the percentage only.
 * Otherwise it will display the fill progress in the given unit
 */
const InventoryFillProgress = ({
    current,
    max,
    unit="",  
    className,  
}) => {
    const intl = useIntl()

    const percentage = current / max * 100
    const displayNumber = (number) => intl.formatNumber(number, {unit, unitDisplay: 'narrow', style: 'unit'})

    const displayFillText = () => {
        if (unit != "") {
            const currentString = displayNumber(current)
            const maxString = displayNumber(max)

            return (
                `${currentString} / ${maxString} (${percentage.toFixed(1)}%)`
            )
        } else {
            return (
                `${percentage.toFixed(1)}%`
            )
        }
    }

    return (
        <div
        className={className}
        >
            <LinearProgress variant="determinate" value={percentage} />
            <Typography variant="caption">
                { displayFillText() }
            </Typography>
        </div>
    )
}

InventoryFillProgress.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    unit: PropTypes.string,
}

export default InventoryFillProgress