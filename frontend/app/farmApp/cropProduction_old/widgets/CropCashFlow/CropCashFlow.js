import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    WidgetLight,
    SimpleProgress
} from 'farmApp/components'

const FullWidth = styled.div`
    width: 100%;
`

const CropCashFlow = ({

}) => {
    return (
        <WidgetLight
            title={messages.title}
            //subheader={messages.subheader}
        >
            <FullWidth>
                <SimpleProgress
                    style={{marginBottom: "10px"}}
                    title="Income"
                    valueText="23.500 HUF"
                    progress={100}
                />
                <SimpleProgress
                    title="Expenes"
                    valueText="16.500 HUF"
                    progress={30}
                />
            </FullWidth>
        </WidgetLight>
    )
}


CropCashFlow.propTypes = {

}

export default CropCashFlow
