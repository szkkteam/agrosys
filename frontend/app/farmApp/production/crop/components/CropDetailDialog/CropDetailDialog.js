import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { Modal } from 'site/components'
import { Detail, DetailContainer } from 'farmApp/components/Detail'

import CropTabGeneral from './CropTabGeneral'

const Tab1 = () => <div>Tab 1</div>
const Tab2 = () => <div>Tab 2</div>

const Container = styled.div`
    padding: 10px 15px;
`

const CropDetailDialog = ({
    data,
    onClose,
    ...props
}) => {
    //console.debug("headerProps: ", headerProps)
    console.debug("Props: ", props)

    const tabs = [
        {label: messages.tabGeneral, value: 0, component: props => (
            <Tab1 
                title={messages.tabGeneral}
            />
        )},
        //{label: messages.title, value: 1, component: props => <Tab2 />},
    ]
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