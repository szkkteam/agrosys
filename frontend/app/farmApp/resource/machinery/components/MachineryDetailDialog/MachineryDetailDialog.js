import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { Modal } from 'site/components'
import { Detail, DetailContainer } from 'farmApp/components/Detail'

import MachineryTabGeneral from './MachineryTabGeneral'

const Tab1 = () => <div>Tab 1</div>
const Tab2 = () => <div>Tab 2</div>

const MachineryDetailDialog = ({
    data,
    ...props
}) => {
    //console.debug("headerProps: ", headerProps)
    console.debug("Props: ", props)

    const tabs = [
        {label: messages.tabGeneral, value: 0, component: props => (
            <MachineryTabGeneral 
                title={messages.tabGeneral}
            />
        )},
        //{label: messages.title, value: 1, component: props => <Tab2 />},
    ]

    return (
        <Detail
            headerProps={{
                title: messages.title,                    
            }}
            height={400}
            tabs={tabs}
            {...props}
        >
        </Detail>
    )
}

MachineryDetailDialog.propTypes = {

}

export default MachineryDetailDialog