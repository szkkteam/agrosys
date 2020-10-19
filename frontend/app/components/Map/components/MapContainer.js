import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { 
    createParcel,
    updateParcel,
} from 'parcel/actions'

import { mapEvents, mapEdit } from 'components/Map/actions'
import { selectMap } from 'components/Map/reducer'
/*
import {
    getSelectedParcel,
} from 'parcel/selectors' */
import { selectSelectedSeasons } from 'season/reducers/seasons'

import {
    Draw,
    Map,
    MapToolbar,
    EditToolbarGroup,
} from 'components/Map/components'

import {
    FormParcel,
} from 'parcel/components'

const mapStateEnum = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    IDLE: 'IDLE',
}


class MapContainer extends React.Component {

    constructor(props) {
        super(props)
        
        this.draw = React.createRef();
    }


    componentDidUpdate(prevProps) {      
        if ( this.props.isEdit && this.props.isEdit !== prevProps.isEdit ) {
            const { initialValues } = this.props
            // New editing signal arrived from the store
            this.draw.current.addPolygon(initialValues.geometry)
            this.draw.current.toggleEdit(true)
        }
        if ( this.props.isNew && this.props.isNew !== prevProps.isNew ) {
            // New add signal arrived from store
            this.draw.current.drawPolygon()
        }
        if ( !this.props.isDraw && this.props.isDraw !== prevProps.isDraw ) {
            // New cancel signal arrived from store
            this.draw.current.stopDraw()
        }
    }

    componentWillUnmount() {
        const { mapEdit } = this.props
        if (this.props.isDraw) {
            mapEdit && mapEdit.cancel()
        }
    }

    onFinished = ({featureInEdit, bounds}) => {
        // Force the map bounds to the new geometry
        this.toBounds(bounds)
         
        console.log("featureInEdit: ", featureInEdit)
        //console.log("bounds: ", bounds)
    }

    toBounds = (bounds) => {
        const { mapEvents } = this.props
        mapEvents && mapEvents.add({
            eventRequest: {
                type: "fly-to-bounds",
                config: {
                    bounds: bounds,
                }
            }
        })
    }

    onFeatureAdded = ({layer, bounds}) => {
        this.toBounds(bounds)
    }

    onUpdate = ({featureInEdit}) => {
        console.log("onUpdate: ", featureInEdit)
    }

    render() {
        return (
            <Map
                editable={true}                
            >   
                <Draw
                    ref={this.draw}
                    onUpdate={this.onUpdate}
                    onFinished={this.onFinished}
                    onFeatureAdded={this.onFeatureAdded}
                />
                <MapToolbar
                >
                    <EditToolbarGroup
                    />
                </MapToolbar>
            </Map>  
        ) 
    }
}


const mapStateToProps = (state) => {
    const mapState = selectMap(state)
    return ({
        isDraw: mapState.editData !== null,
        isEdit: mapState.isEditing && mapState.editData !== null,
        isNew: !mapState.isEditing && mapState.editData !== null,
        initialValues: mapState.editData,
        selectedParcel: null,
        selectedSeason: null,
    })
}

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ mapEvents, mapEdit }, dispatch),
)



export default compose(
    withConnect,
)(MapContainer)
