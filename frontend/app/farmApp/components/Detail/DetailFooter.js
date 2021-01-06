import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { SubmitButton, messages as ButtonMessages } from 'components/Button'

import CloseIcon from '@material-ui/icons/Close';
import {
    DialogActions,
    IconButton,
    Typography
} from '@material-ui/core';


const Footer = styled(DialogActions)`
    ${({ theme }) => `
        //background-color: ${theme.palette.primary.main};
        background-color: lightgray;
        display: flex;
        align-items: center;
    `}    
`

//<FormattedMessage {...title} />
const DetailFooter = ({
    onClose,
    ...props
}) => {
    return (
        <Footer>
            <SubmitButton
                cancelTitle={ButtonMessages.cancel}
                submitTitle={ButtonMessages.submit}
                submitDisabled={false}
                onCancel={onClose}
                //onSubmit={() => null}
                {...props}
            />            
        </Footer>
    )
}


DetailFooter.propTypes = {

}

export default DetailFooter