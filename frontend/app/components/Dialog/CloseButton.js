import React, { useRef, useMemo, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useContext } from './hooks'

import CloseIcon from '@material-ui/icons/Close';
import {
    IconButton,
} from '@material-ui/core';

const Icon = styled(CloseIcon)`
    ${({ theme }) => `
        color: inherit;
        //color: #fff;
    `}  
`

const CloseButton = forwardRef(({
    onClose,
    ...props
}, ref) => {
    const { handleCancel } = useContext()
    return (
        <IconButton     
            ref={ref}
            aria-label="close"
            onClick={onClose ?? handleCancel}
            {...props}
        >
            <Icon />
        </IconButton>      
    )
})


CloseButton.propTypes = {
    onClose: PropTypes.func
}

export default CloseButton