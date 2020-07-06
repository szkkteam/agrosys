import React from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreatorsAction } from 'actions'
import { injectReducer } from 'utils/async'

import { 
    mapEdit,
    mapEvents,
    mapEditFeatureActionsTypes,
    mapEventActionsTypes
} from 'map/actions'
import { selectMap } from 'map/reducer'

import { 
    LeafletMap,
    MapDraw,
 } from 'map/components'

class Map extends React.Component {

    render() {
        const { mapState, mapEdit, mapEvents } = this.props
        const { isDrawingStarted, isDrawingFinished, featureInEdit, events } = mapState
        const activateDraw = isDrawingStarted | isDrawingFinished
        return (
            <LeafletMap
                editable={activateDraw}
                events={events}
                mapEventAction={mapEvents}
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
    // TODO: Wanted to do something with other actions. Dont know what.
    //(dispatch) => bindRoutineCreatorsAction({ mapEdit }, dispatch, mapEditFeatureActionsTypes),
  )

  const withConnectMapEvent = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreatorsAction({ mapEvents }, dispatch, mapEventActionsTypes),
    // TODO: Wanted to do something with other actions. Dont know what.
    //(dispatch) => bindRoutineCreatorsAction({ mapEdit }, dispatch, mapEditFeatureActionsTypes),
  )

  

export default compose(
    withReducer,
    withConnectMapEdit,
    withConnectMapEvent,
)(Map)
