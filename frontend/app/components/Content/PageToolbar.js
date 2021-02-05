import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Toolbar as MuiToolbar,
    Paper,
} from '@material-ui/core'


const WideToolbar = styled(({sticky, ...props}) => <MuiToolbar {...props}/>)`
    width: 100%;
    display: flex;
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

const PageToolbar = ({
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

PageToolbar.propTypes = {

}

export default PageToolbar
