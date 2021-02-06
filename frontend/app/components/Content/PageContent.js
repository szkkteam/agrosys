import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

const Container = styled(({spacing, margin, overflow, ...props}) => <div {...props}/>)`
    ${Spacing}
    ${({theme, overflow=false}) => `
        flex-grow: 1;
        display: flex;        
        overflow-y: ${overflow? 'auto': 'hidden'};
        flex-direction: column;
    `}
`

const PageContent = ({
    children,
    ...props
}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    )
}

PageContent.propTypes = {
    overflow: PropTypes.bool,
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