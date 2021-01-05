import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

//import { Modal } from 'site/components'
import CloseIcon from '@material-ui/icons/Close';
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

const Spacer = styled.div`
    flex-grow: 1;
`
//<FormattedMessage {...title} />
const DetailHeader = ({
    title,
    onClose,
    ...props
}) => {

    return (
        <Header disableTypography id="max-width-dialog-title">
            <Title variant="h6">
                {title}
            </Title>    
            <Spacer />
            <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
            </IconButton>      
        </Header>
    )
}


DetailHeader.propTypes = {

}

export default DetailHeader