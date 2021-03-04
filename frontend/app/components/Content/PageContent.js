import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing, shadows } from '@material-ui/system';
//import { Spacing } from 'styles'

const Container = styled(({overflow, component: Component, ...props}) => <Component {...props}/>)`
    ${spacing}
    ${shadows}
    ${({theme, overflow=false}) => `
        flex-grow: 1;
        display: flex;        
        overflow-y: ${overflow? 'auto': 'hidden'};
        flex-direction: column;
    `}
`

const PageContent = ({
    component='div',
    children,
    ...props
}) => {
    return (
        <Container component={component} {...props}>
            {children}
        </Container>
    )
}

PageContent.propTypes = {
    overflow: PropTypes.bool,
    component: PropTypes.elementType,
    margin: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),
    padding: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),
}

export default PageContent