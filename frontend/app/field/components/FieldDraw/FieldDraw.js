import React from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreatorsAction } from 'actions'
import { injectReducer } from 'utils/async'

import { mapEdit, mapEditFeatureActionsTypes } from 'map/actions'
import { selectMap } from 'map/reducer'

import { 
    SplitPane,
} from 'field/components'

import { 
    Map,
 } from 'map/components'

class FieldDraw extends React.Component { 
 
    componentWillMount() {
        const { mapState, mapEdit } = this.props
        const { isDrawingStarted, isDrawingFinished } = mapState
        if (!(isDrawingStarted && isDrawingFinished)) {            
            mapEdit.drawRequested()
        }
      }

    render() {
        return (
            <SplitPane
                leftSize={9}
                rightSize={3}
            >
                <Map />
                <div />

            </SplitPane>
        )
    }
}


const withReducer = injectReducer(require('map/reducer'))

const withConnect = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreatorsAction({ mapEdit }, dispatch, mapEditFeatureActionsTypes),
    // TODO: Wanted to do something with other actions. Dont know what.
    //(dispatch) => bindRoutineCreatorsAction({ mapEdit }, dispatch, mapEditFeatureActionsTypes),
  )

export default compose(
    withReducer,
    withConnect,
)(FieldDraw)
