import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing, shadows } from '@material-ui/system';
//import { Spacing } from 'styles'

const Container = styled(({overflow, component: Component, ...props}) => <Component {...props}/>)`
    ${spacing}
    ${shadows}
    ${({theme, overflow='hidden'}) => `
        flex-grow: 1;
        display: flex;        
        overflow-y: ${overflow};
        overflow-x: hidden;
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


export const PageContentPropTypes = {
    overflow: PropTypes.oneOf([
        'initial', 'auto', 'hidden', 'scroll'
    ]),
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


PageContent.propTypes = PageContentPropTypes

export default PageContent