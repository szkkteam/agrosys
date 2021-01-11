import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { Modal } from 'site/components'
import { Detail, DetailContainer } from 'farmApp/components/Detail'

import CropTabGeneral from './CropTabGeneral'

const Container = styled.div`
    padding: 10px 15px;
`

const CropDetailDialog = ({
    data,
    onClose,
    ...props
}) => {

    return (
        <Detail
            title={messages.title}
            onClose={onClose}
        >
            <Container>
                <CropTabGeneral 
                    title={messages.tabGeneral}
                    {...props}
                />
            </Container>
        </Detail>
    )
}

CropDetailDialog.propTypes = {

}

export default CropDetailDialog