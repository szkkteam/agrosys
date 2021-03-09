import React, { useRef, useMemo, useLayoutEffect, useEffect, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { useGeoJsonToLatLong } from '../../hooks'

import { 
    Polygon,
    useMapEvents
} from "react-leaflet";

import MapTooltip from '../MapTooltip/MapTooltip'

const MapFeature = forwardRef(({
    feature,
    onClick,
    tooltip,
    ...props
}, ref) => {
    const featureRef = useRef(null)
    const path = useGeoJsonToLatLong(feature)

    useImperativeHandle(ref, () => ({
        getBounds() {
            if (featureRef && featureRef?.current) return featureRef.current.getBounds()
            else null
            return false
        },        
    }));

    const map = useMapEvents({
        click: (e) => {
            console.debug(e)
            e.originalEvent.view.L.DomEvent.stopPropagation(e)
            onClick && onClick(e, map)
        }
    })


    return (
        <Polygon
            ref={featureRef}
            {...props}
            positions={path}
        >
            {tooltip && 
                <MapTooltip>
                    {tooltip}
                </MapTooltip>
            }
        </Polygon>
    )
})

MapFeature.propTypes = {

}

export default MapFeature