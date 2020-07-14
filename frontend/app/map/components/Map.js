import React from 'react'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreatorsAction } from 'actions'
import { injectReducer } from 'utils/async'

import { 
    mapEdit,
    mapEvents,
    mapViewport,
    mapEditFeatureActionsTypes,
    mapEventActionsTypes,
    mapViewportActionsTypes
} from 'map/actions'
import { selectMap } from 'map/reducer'

import { 
    LeafletMap,
    MapDraw,
 } from 'map/components'

class Map extends React.Component {

    render() {
        const { mapState, mapEdit, mapEvents, mapViewport, children } = this.props
        const { isDrawingStarted, isDrawingFinished, featureInEdit, events, viewPort } = mapState
        const activateDraw = (isDrawingStarted | isDrawingFinished) 
        return (
            <React.Fragment>
                <Helmet>
                    <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
                    <script src="https://npmcdn.com/leaflet.path.drag/src/Path.Drag.js"></script>
                </Helmet>
                <LeafletMap
                    enableDoubleClickZoom={!isDrawingStarted}
                    editable={activateDraw}
                    events={events}
                    startBounds={viewPort}
                    mapEventAction={mapEvents}
                    mapViewportAction={mapViewport}                
                >
                    {activateDraw && <MapDraw  
                        feature={featureInEdit}
                        mapEditAction={mapEdit}
                        mapEventAction={mapEvents}
                    />}
                    {children}
                </LeafletMap>
            </React.Fragment>
        )
    }
}


const withReducer = injectReducer(require('map/reducer'))

const withConnectMapEdit = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreatorsAction({ mapEdit }, dispatch, mapEditFeatureActionsTypes),
  )

  const withConnectMapEvent = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreatorsAction({ mapEvents }, dispatch, mapEventActionsTypes),
  )

  const withConnectMapViewport = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreatorsAction({ mapViewport }, dispatch, mapViewportActionsTypes),
)
  

export default compose(
    withReducer,
    withConnectMapEdit,
    withConnectMapEvent,
    withConnectMapViewport,
)(Map)
