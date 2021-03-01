import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import { useDateFnsLocale } from 'utils/hooks'
import { DatePicker } from "@material-ui/pickers";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {
    TextField,
    Paper,
    Typography,
    IconButton
} from '@material-ui/core'

const Flex = styled(Paper)`
    display: flex;
    align-items: center;
`

const SeasonArrowSelector = ({
    onChange,
    season,
    ...props
}) => {
    const { mask } = useDateFnsLocale()

    const handleIncrement = () => {
        onChange && onChange(parseInt(season) + 1)
    }

    const handleDecrement = () => {
        onChange && onChange(parseInt(season) - 1)
    }

    return (
        <Flex>
            <IconButton
                disableRipple
                onClick={handleDecrement}
            >
                <ChevronLeftIcon />
            </IconButton>
            <Typography variant="body2">
                {season}
            </Typography>
            <IconButton
                disableRipple
                onClick={handleIncrement}
            >
                <ChevronRightIcon />
            </IconButton>
        </Flex>

        
    )
}
/*
<DatePicker
            mask={mask}
            views={["year"]}
            label="Basic example"
            allowSameDateSelection
            //value={value}
            onChange={(newValue) => {
                console.debug("newValue: ", newValue)
                setValue(newValue)}
            }
           {...props} 
           renderInput={(props) => 
               <TextField 
                   {...props}
                   //{...inputProps}
               />
           }
       />
*/

SeasonArrowSelector.propTypes = {
    season: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SeasonArrowSelector