import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    TextField,
    MenuItem,
} from '@material-ui/core'

const Container = styled.div`
    max-width: 220px;
`

const SeasonSelector = ({
    className,
    seasons,
    ...props
}) => {
   

    return (
        <Container className={className}>
            <TextField
                select
                variant="outlined"
                fullWidth
                {...props}
            >
                {seasons.map((season) => (
                    <MenuItem key={season} value={season}>
                        {season}
                    </MenuItem>
                ))}
            </TextField>
        </Container>

        
    )
}

SeasonSelector.propTypes = {
    seasons: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])).isRequired    
}

export default SeasonSelector