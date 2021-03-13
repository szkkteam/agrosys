import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useGetTooltipOverlay } from '../../hooks'

import { 
    Tooltip as LeafletTooltip
} from "react-leaflet";

const Tooltip = styled(LeafletTooltip)`
  padding: 0 !important;
  pointer-events: auto !important;
  transform: opacity 1s ease-in-out;
`

const MapTooltip = ({
    children,
    ...props
}) => {
    const visible = useGetTooltipOverlay()
    
    if (!visible) return null
    else return (
        <Tooltip 
            direction="top"
            offset={[0, 20]}
            permanent
            {...props}
            interactive={false /* TODO: If interactive set, its causing an error during unmount */} 
            //visible={visible}
            opacity={1}

        >
            {children}          
        </Tooltip>
    )
}

MapTooltip.propTypes = {

}

export default MapTooltip