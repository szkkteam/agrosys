import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    WidgetLight,
} from 'farmApp/components'

const CropROI = ({

}) => {
    return (
        <WidgetLight
            title={messages.title}
            subheader={messages.subheader}
        >
            TODO: ROI
        </WidgetLight>
    )
}


CropROI.propTypes = {

}

export default CropROI
