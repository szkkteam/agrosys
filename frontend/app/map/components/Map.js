import React from 'react'

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
        const { mapState, mapEdit, mapEvents, mapViewport } = this.props
        const { isDrawingStarted, isDrawingFinished, featureInEdit, events, viewPort } = mapState
        const activateDraw = isDrawingStarted | isDrawingFinished
        return (
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
            </LeafletMap>
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
