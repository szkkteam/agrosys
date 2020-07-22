import React from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreatorsAction } from 'actions'
import { injectReducer } from 'utils/async'

import { 
    mapEvents,
    mapEventActionsTypes,
} from 'map/actions'
 
import { selectMap } from 'map/reducer'

import { 
    Map,
    MapEditFeature,
    MapFeature,
    MapControl,
} from 'map/components'

import { getArea } from 'map/utils'

import './fielddetailmap.scss'
/**
     <GeoJSON 
        key={lastFieldDetail.id}
        data={lastFieldDetail.shape} />
 */
class FieldDetailMap extends React.Component 
{
    static defaultProps = {
        enableDrawing: false,
      }

    constructor(props) {
        super(props)

        this.state = {
            // Set the default props for drawing
            enableDrawing: this.props.enableDrawing,
            featureInEdit: null
        }
        
    }   

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.enableDrawing && nextState.enableDrawing) {
            console.log("shouldComponentUpdate -> false | nextState: " + nextState.enableDrawing + " thisState: " + this.state.enableDrawing)
            return false
        }
        console.log("shouldComponentUpdate -> true | nextState: " + nextState.enableDrawing + " thisState: " + this.state.enableDrawing)
        return true
    }

    onMouseHover = (field, e) => {
        //console.log("Highlight: ", field)
    }

    toggleEnableDrawing = () => {
        this.setState({
            enableDrawing: !this.state.enableDrawing
        })
    }

    onClickEdit = (e) => {
        this.setState({
            enableDrawing: true
        })
    }

    onClickFinish = (e) => {
        const { onEditFinished } = this.props
        this.setState({
            enableDrawing: false,
        })
        onEditFinished && onEditFinished({
            featureInEdit: this.state.featureInEdit,
        })
    }

    onClickCancel = (e) => {
        console.log("onClickCancel")
        this.setState({
            enableDrawing: false,
            featureInEdit: null
        })
        
    }

    onEdit = ({featureInEdit}) => {
        //console.log("onEdit: ", featureInEdit)
        if (featureInEdit) {
            this.setState({
                featureInEdit: featureInEdit
            })
        }
    }
 
    onAdd = ({bounds}) => {
        console.log("onAdd call with bounds: ", bounds)
        const { mapEvents } = this.props
        mapEvents && mapEvents.addEvent({
            eventRequest: {
                type: "fly-to-bounds",
                config: {
                    bounds: bounds,
                }
            }
        })
    }

    renderStaticFeature = (featureInEdit) => {
        console.log("renderStaticFeature: ", featureInEdit.area)
        return (
             <MapEditFeature key={`static-${featureInEdit.area}`}
                    featureInEdit={featureInEdit.shape}
                    onAdd={this.onAdd}
                />
        )
    }

    renderEditableFeature = (featureInEdit) => {
        return (
            <MapEditFeature key={`editable-${featureInEdit.id}`}
                featureInEdit={featureInEdit.shape}
                enableEdit={true}
                onEdit={this.onEdit}
                onAdd={this.onAdd}
        />
        )
    }

    renderDrawableFeature = () => {
        return (
            <MapEditFeature key={`drawable-${featureInEdit.id}`}
                    onEdit={this.onEdit}
                />
        )
    }
  
    render() {
        const { fields, onClickFeature, featureInEdit } = this.props
        const { enableDrawing } = this.state

        //const { featureInEdit } = this.state

        console.log("this.featureInEdit render: ", featureInEdit)
        return(
            <Map
                enableEdit={true}
            >
                <MapControl>
                    { enableDrawing? 
                        <div>
                            <button 
                                style={{backgroundColor: "white"}}
                                onClick={this.onClickFinish} 
                            >
                                Save
                            </button>                            
                            <button 
                                style={{backgroundColor: "white"}}
                                onClick={this.onClickCancel} 
                            >
                                Cancel
                            </button>      
                        </div> 
                    :
                        <button 
                            style={{backgroundColor: "white"}}
                            onClick={this.onClickEdit} 
                        >
                            Edit
                        </button>      
                    }                    
                </MapControl>
                { enableDrawing? 
                    this.renderEditableFeature(featureInEdit) :
                    this.renderStaticFeature(featureInEdit) }
                { fields && Array.isArray(fields) && fields.map((field, id) => {
                    return <MapFeature
                                key={field.id}
                                field={field}
                                onMouseHover={this.onMouseHover}
                                 onClick={onClickFeature}
                            /> 
                 })}
            </Map>
        )
    }
}


const withReducer = injectReducer(require('map/reducer'))

const withConnect = connect(
    (state) => ({mapState: selectMap(state)}),
    (dispatch) => bindRoutineCreatorsAction({ mapEvents }, dispatch, mapEventActionsTypes),
  )

export default compose(
    withReducer,
    withConnect,
)(FieldDetailMap)
