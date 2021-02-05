import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

const Container = styled.div`
${({theme, spacing=0, overflow=false}) => `
    flex-grow: 1;
    display: flex;        
    overflow-y: ${overflow? 'auto': 'hidden'};
    flex-direction: column;
    ${theme.breakpoints.up('sm')} {
        //padding: 15px calc(${theme.spacing(spacing)}px / 2 + 1px);
    }
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

}

export default PageContent