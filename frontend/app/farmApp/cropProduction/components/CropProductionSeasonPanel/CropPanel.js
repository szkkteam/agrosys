import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import {
    ExpandPanel
} from 'farmApp/components'

const CropPanel = ({
    children,
    ...props
}) => {
   
    return (
        <ExpandPanel        
            actionDisable
            {...props}            
        >
            {children}
        </ExpandPanel>
        
    )
}

CropPanel.propTypes = {

}

export default CropPanel