import React from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { injectReducer } from 'utils/async'

import { mapEvents, mapEventActionsTypes } from 'map/actions'
import { selectMap } from 'map/reducer'

import { 
    SplitPane,
    FormFieldDraw,
} from 'field/components'

import { 
    Map,
    MapEditFeature,
 } from 'map/components'

class FieldDraw extends React.Component { 
    
    constructor(props) {
        super(props)

        this.state = {
            startDraw: true,
            featureInEdit: null,
        }
    }

   onFinishedEditing = ( {featureInEdit} ) => {
        this.setState({
            featureInEdit: featureInEdit,
        })
   }

   onFinishedDrawing = ( {featureInEdit, bounds} ) => {
       const { mapEvents } = this.props
        mapEvents && mapEvents.addEvent({
            eventRequest: {
                type: "fly-to-bounds",
                config: {
                    bounds: bounds,
                }
            }
        })
        this.setState({
            featureInEdit: featureInEdit,
        })
   }

    render() {
        const { startDraw, featureInEdit } = this.state
        return (
            <SplitPane
                leftSize={9}
                rightSize={3}
            >
                <Map
                    enableEdit={startDraw}
                > 
                    <MapEditFeature
                        onFinished={this.onFinishedDrawing}
                        onEdit={this.onFinishedEditing}
                        startDraw={startDraw}
                    />
                </Map>
                <FormFieldDraw
                    featureInEdit={featureInEdit}
                />

            </SplitPane>
        )
    }
}

const withReducer = injectReducer(require('map/reducer'))

const withConnect = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreators({ mapEvents }, dispatch),
  )

export default compose(
    withReducer,
    withConnect,
)(FieldDraw)
