import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useModalContext } from '../hooks'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    IconButton
} from '@material-ui/core';

const StyledButton = styled(IconButton)`
    padding: 5px;
    margin-left: 15px;
    color: #fff;
`

const BackButton = forwardRef(({
    onBack,
    ...props
}, ref) => {
    const { handleCancel } = useModalContext()
    return (
        <StyledButton 
            ref={ref}
            aria-label="close"
            onClick={onBack ?? handleCancel}
            {...props}
        >
            <ArrowBackIosIcon />
        </StyledButton>      
    )
})


BackButton.propTypes = {
    onBack: PropTypes.func
}

export default BackButton