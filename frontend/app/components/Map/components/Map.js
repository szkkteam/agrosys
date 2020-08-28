import React from 'react'
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
    return (
    <React.Fragment>
        <Helmet>
            <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
        </Helmet>
        <LeafletMap
            events={events}
            startBounds={viewPort}
            mapEventAction={mapEvents}
            mapViewportAction={mapViewport}   
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
