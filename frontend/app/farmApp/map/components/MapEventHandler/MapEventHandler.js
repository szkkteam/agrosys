import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    useDispatchViewportChanged,
    useDispatchClearEvent,
    useMapReducer,
    useGetBounds,
    useGetLastEvent,
} from '../../hooks'

import {
    useMapEvents
} from 'react-leaflet'

const MapEventHandler = ({

}) => {
    useMapReducer()

    const viewPortChanged = useDispatchViewportChanged()
    const clearEvents = useDispatchClearEvent()

    const initialBounds = useGetBounds()
    const event = useGetLastEvent()
   
    const map = useMapEvents({
        moveend: (e) => {
            viewPortChanged(map.getBounds())
        }
    })

    const handleEvent = ({type, config: { bounds }}) => {
        switch(type) {
            case "fly-to-bounds":
                map.flyToBounds(bounds)
                break
            case "fit-to-bounds":
                    map.fitBounds(bounds)
                    break
            default:
                break
        }
    }
    
    useEffect(() => {
        if (initialBounds) {
            map.fitBounds(initialBounds)
        }        
    }, [])

    useEffect(() => {
        if (event) {
            handleEvent(event)
            clearEvents()
        }
    }, [event])

    return (
         null
    )
}

MapEventHandler.propTypes = {

}

export default MapEventHandler