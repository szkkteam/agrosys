import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { PrimaryCardHeader } from 'styles'
import { useFormatTitle } from 'utils/hooks'

import {
    CardHeader as MuiCardHeader,
} from '@material-ui/core'

const Background = styled.div`
    ${({theme, shrinkHeader}) => `
        
        position: relative;
        padding-bottom: ${shrinkHeader? '0px': '15px'};        
    `}
    ${props => props.color === "primary" && PrimaryCardHeader}
`


const CardHeader = ({
    title,
    subheader,
    color="default",
    className,
    children,
    shrinkHeader=false,
    ...props
}) => {

    const formattedTitle = useFormatTitle(title)
    const formattedSubheader = useFormatTitle(subheader)

    return (
        <Background 
            PrimaryCardHeader
            className={className}
            shrinkHeader={shrinkHeader}
            color={color}
            >
            <MuiCardHeader
                title={formattedTitle}
                subheader={formattedSubheader}
                {...props}
            />
            {children}
        </Background>
    )
}


CardHeader.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    subtitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    shrinkHeader: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "default"])
}

export default CardHeader
