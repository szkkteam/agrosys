import React, { useRef, useMemo, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    DialogTitle,
    IconButton,
    Typography
} from '@material-ui/core';


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


const FullHeader = forwardRef(({
    className,
    title,
    startComponent,
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
        </Header>
    )
})


FullHeader.propTypes = {
    title: PropTypes.object.isRequired,
    startComponent: PropTypes.element,
    children: PropTypes.element,
}

export default FullHeader