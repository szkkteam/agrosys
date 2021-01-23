import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    IconButton
} from '@material-ui/core';

const StyledButton = styled(IconButton)`
    color: #fff;
`

const BackButton = forwardRef(({
    ...props
}, ref) => {
    return (
        <StyledButton 
            ref={ref}
            aria-label="close"
            {...props}
        >
            <ArrowBackIosIcon />
        </StyledButton>      
    )
})


BackButton.propTypes = {
}

export default BackButton