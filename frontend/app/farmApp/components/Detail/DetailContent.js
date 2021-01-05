import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

const Container = styled.div`
    ${({ theme, height }) => `
        ${height? `height: ${height}px;` : ''}
    `}  
`

const DetailContent = ({
    height,
    children,
    ...props
}) => {
    return (
        <Container
        height={height}
        >
            {children}
        </Container>
    )
}

DetailContent.propTypes = {

}

export default DetailContent