import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'; 
import { useIntl } from 'react-intl'
import styled from 'styled-components'

const Container = styled.div`
    padding: 7px 10px;
`

const ModalContent = ({
    className,
    children,
    ...props
}) => {

    return (
        <Container
            className={className}
        >
            {children}
        </Container>
    )
}


ModalContent.propTypes = {

}

export default ModalContent