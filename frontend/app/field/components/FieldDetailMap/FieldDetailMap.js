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
        }
        this.featureInEdit = this.props.featureInEdit
    }   

    componentWillReceiveProps(nextProps) {
        console.log("componentDidUpdate")
        if ((this.featureInEdit !== this.props.featureInEdit) && !this.state.enableDrawing ) {
            this.featureInEdit = this.props.featureInEdit
        }        
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
            enableDrawing: false
        })
        onEditFinished && onEditFinished({
            featureInEdit: this.featureInEdit,
        })
    }

    onClickCancel = (e) => {
        this.setState({
            enableDrawing: false
        })
        this.featureInEdit = this.props.featureInEdit
        this.forceUpdate();
    }

    onEdit = ({featureInEdit}) => {
        console.log("onEdit: ", featureInEdit)
        if (featureInEdit) {
            this.featureInEdit = featureInEdit
        }
    }

    onAdd = ({bounds}) => {
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
  
    render() {
        const { fields, featureInEdit, onClickFeature } = this.props
        const { enableDrawing } = this.state
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
                <MapEditFeature
                    featureInEdit={this.featureInEdit? this.featureInEdit.shape : featureInEdit && featureInEdit.shape}
                    enableEdit={enableDrawing}
                    onEdit={this.onEdit}
                    onAdd={this.onAdd}
                />
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
