import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { fade } from '@material-ui/core/styles/colorManipulator';


import InfoIcon from '@material-ui/icons/Info';
import {
    IconButton,
    CardHeader as MuiCardHeader,
    
} from '@material-ui/core'

const Background = styled.div`
    ${({theme, shrinkHeader}) => `
        position: relative;
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        padding-bottom: ${shrinkHeader? '0px': '15px'};
        & .MuiCardHeader-subheader {
            color: ${fade(theme.palette.primary.contrastText, 0.64)};
        }
        & .MuiIconButton-root {
            color: ${fade(theme.palette.primary.contrastText, 1)};
        }
    `}
`

const CardHeader = ({
    className,
    children,
    shrinkHeader=false,
    ...props
}) => {
    const intl = useIntl()
    
    return (
        <Background className={className} shrinkHeader={shrinkHeader}>
            <MuiCardHeader
                {...props}
            />
            {children}
        </Background>
    )
}


CardHeader.propTypes = {
    shrinkHeader: PropTypes.bool,
}

export default CardHeader
