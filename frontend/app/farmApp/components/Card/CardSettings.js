import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import Zoom from '@material-ui/core/Zoom';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    IconButton,
    Tooltip
} from '@material-ui/core'


const CardSettings = ({
    ...props
}) => {
    return (
    
        <IconButton aria-label="more">
            <MoreVertIcon />
        </IconButton>
    )
}


CardSettings.propTypes = {

}

export default CardSettings
