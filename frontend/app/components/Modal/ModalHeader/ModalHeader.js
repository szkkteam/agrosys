import React, { useRef, useMemo, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

//import { Modal } from 'site/components'
import CloseIcon from '@material-ui/icons/Close';
import {
    DialogTitle,
    IconButton,
    Typography
} from '@material-ui/core';

import CloseButton from '../components/CloseButton'


const Header = styled(DialogTitle)`
    ${({ theme }) => `
        padding: 16px 0;
        //margin: 0 24px;
        background-color: ${theme.palette.primary.main};
        display: flex;
        align-items: center;
    `}    
`

const Title = styled(Typography)`    
    margin-left: 20px;
    color: #fff;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const ModalHeader = forwardRef(({
    className,
    title,
    startComponent,
    endComponent=<CloseButton />,
    children,    
    ...props
}, ref) => {
    return (
        <Header 
            ref={ref}
            className={className}
            disableTypography
            {...props}
        >

            {startComponent}
            <Title variant="h6">
                <FormattedMessage {...title} />
            </Title>    
            {children}
            <Spacer /> 
            {endComponent}
        </Header>
    )
})


ModalHeader.propTypes = {
    title: PropTypes.object.isRequired,
    startComponent: PropTypes.element,
    endComponent: PropTypes.element,
    children: PropTypes.element,
}

export default ModalHeader