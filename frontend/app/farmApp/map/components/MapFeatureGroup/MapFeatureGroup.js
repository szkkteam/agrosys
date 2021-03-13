import React, { useRef, useMemo, useLayoutEffect, useEffect, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    FeatureGroup,
} from "react-leaflet";

import MapTooltip from '../MapTooltip/MapTooltip'

const MapFeatureGroup = forwardRef(({
    tooltip,
    children,
    ...props
}, ref) => {
    const groupRef = useRef(null)

    useImperativeHandle(ref, () => ({
        getBounds() {
            if (groupRef && groupRef?.current) return groupRef.current.getBounds()
            else null
        },        
    }));

    return (
        <FeatureGroup
            ref={groupRef}
            {...props}
        >
            {children}
            {tooltip &&  
                <MapTooltip>
                    {tooltip}
                </MapTooltip>
            }
        </FeatureGroup>
    )
})

MapFeatureGroup.propTypes = {

}

export default MapFeatureGroup