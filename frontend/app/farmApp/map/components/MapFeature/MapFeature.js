import React, { useRef, useMemo, useLayoutEffect, useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import Fade from '@material-ui/core/Fade';

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
    //const [tooltipVisible, setTooltipVisible] = useState(true)
    const featureRef = useRef(null)
    const path = useGeoJsonToLatLong(feature)

    useImperativeHandle(ref, () => ({
        getBounds() {
            if (featureRef && featureRef?.current) return featureRef.current.getBounds()
            else null
            return false
        },        
    }));

    const eventHandlers = useMemo(() => ({
        click(e) {
            console.debug(e)
            e.originalEvent.view.L.DomEvent.stopPropagation(e)
            onClick && onClick(featureRef?.current, e)
        },
        /*
        mouseover(e) {
            setTooltipVisible(false)
        },
        mouseout(e) {
            setTooltipVisible(true)
        }
        */
    }), [])

    return (
        <Polygon
            ref={featureRef}
            {...props}
            eventHandlers={eventHandlers}
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