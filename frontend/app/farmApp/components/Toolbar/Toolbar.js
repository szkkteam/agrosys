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


const WideToolbar = styled(MuiToolbar)`
    width: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
`

const Toolbar = ({
    children,

}) => {

    return (
        <WideToolbar
            component={Paper}
        >
            {children}
        </WideToolbar>
    )
}

Toolbar.propTypes = {

}

export default Toolbar
