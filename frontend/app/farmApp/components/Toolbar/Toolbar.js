import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Grid,
    Typography,
    Toolbar as MuiToolbar,
    Chip,
    Avatar,
    Button,
    Paper,
} from '@material-ui/core'


const WideToolbar = styled(({sticky, ...props}) => <MuiToolbar {...props}/>)`
    width: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
    ${({theme, sticky}) => sticky
        ? `
            position: sticky;
            top: 0;
            z-index: 1;
        `
        : ``}   
`

const Toolbar = ({
    sticky=false,
    children,

}) => {

    return (
        <WideToolbar
            sticky={sticky}
            component={Paper}
        >
            {children}
        </WideToolbar>
    )
}

Toolbar.propTypes = {

}

export default Toolbar
