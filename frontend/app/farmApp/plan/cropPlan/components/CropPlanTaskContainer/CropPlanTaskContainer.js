import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Paper,
    Typography,
    Grid
} from '@material-ui/core'

const TitleContainer = styled.div`
    padding: 7px 8px;
`

const CropPlanTaskContainer = ({
    children,
    ...props
}) => {
    return (
        <Paper>
            <TitleContainer>
                <Typography variant="h6">
                    Tasks
                </Typography>
            </TitleContainer>
            {children}
        </Paper>
    )
}

CropPlanTaskContainer.propTypes = {

}

export default CropPlanTaskContainer