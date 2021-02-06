import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import Zoom from '@material-ui/core/Zoom';
import { useFormatTitle } from 'utils/hooks'

import InfoIcon from '@material-ui/icons/Info';
import {
    IconButton,
    Tooltip
} from '@material-ui/core'


const CardInfo = ({
    title,
    ...props
}) => {
    const formattedTooltip = useFormatTitle(title)
    
    return (
        <Tooltip TransitionComponent={Zoom} disableFocusListener interactive title={formattedTooltip}
            {...props}
        >
            <IconButton aria-label="info">
                <InfoIcon />
            </IconButton>
      </Tooltip>
    )
}


CardInfo.propTypes = {

}

export default CardInfo
