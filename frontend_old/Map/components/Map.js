import React, { useState, useEffect } from 'react';

import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer } from 'utils/async'

import { 
    mapEvents,
    mapViewport,
} from 'components/Map/actions'

import { selectMap } from 'components/Map/reducer'

import { 
    LeafletMap,
 } from 'components/Map/components'

const Map = ({
    viewPort,
    events,
    mapEvents,
    mapViewport,
    children,
    ...props,
}) => {

    const mapRef = React.createRef(null);
    useEffect(() => {
        events && events.map((event, id) => (
            handleEvents(event)
        ))        
    })

    const handleEvents = ({type, config}) => {
        switch(type) {
            case "fly-to-bounds":
                config && mapRef.current && mapRef.current.flyTo(config)                
                break
            
            default:
                break
        }
    }

    const onMoveEnd = (bounds) => {      
        events.length && mapEvents && mapEvents.clear()
        mapViewport && mapViewport.changed({
            viewPortChange: bounds,
        })
    }


    return (
    <React.Fragment>
        <Helmet>
            <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
        </Helmet>
        <LeafletMap
            ref={mapRef}
            onMoveEnd={onMoveEnd}
            //events={events}
            startBounds={viewPort}
            //mapEventAction={mapEvents}
            //mapViewportAction={mapViewport}   
            {...props}             
        >
            {children}
        </LeafletMap>
    </React.Fragment>
    )
}

const withReducer = injectReducer(require('components/Map/reducer'))

const withConnect = connect(
    (state) => ({...selectMap(state)}),
    (dispatch) => bindRoutineCreators({ mapEvents, mapViewport }, dispatch),
)
 

export default compose(
    withReducer,
    withConnect,
)(Map)
