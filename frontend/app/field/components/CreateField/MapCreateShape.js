import React from 'react'

import { MapEditable } from 'field/components'
import { getArea } from 'field/components/MapComponents/utils'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindRoutineCreatorsAction } from 'actions'

import { injectReducer } from 'utils/async'
import { createFieldShape, createFieldActionTypes } from 'field/actions'
import { selectCreateFieldShape } from 'field/reducers/createFieldShape'


class MapCreateShape extends React.Component {

    saveShapeArea = (shape, area) => {
        this.props.createFieldShape.drawDone({ shape, area })
    }

    onFinishedDrawing = (e) => {
        const geoJson = e.layer.toGeoJSON()
        this.saveShapeArea(geoJson, getArea(geoJson))
        console.log(e)
        //console.log(e.layer.dragging)
        //console.log(e.layer.toGeoJSON())
        console.log(getArea(e.layer.toGeoJSON()))

        if (e.layer.dragging) {
            e.layer.dragging.disable()
        }

        e.layer._map.flyToBounds(e.layer.getBounds())

        e.layer._map.doubleClickZoom.enable(); 

        if(typeof(this.props.onFinishedDrawing) === 'function') {
            this.props.onFinishedDrawing(e)
        }
    }

    onStartDrawing = (e) => {
        this.props.createFieldShape.drawStarted()
        console.log(e)
        e.editTools.map.doubleClickZoom.disable(); 

        
        if(typeof(this.props.onStartDrawing) === 'function') {
            this.props.onStartDrawing(e)
        }
    }

    onFinishedEditing = (e) => {
        const geoJson = e.layer.toGeoJSON()
        this.saveShapeArea(geoJson, getArea(geoJson))
        console.log(getArea(e.layer.toGeoJSON()))
        //e.preventDefault()
        
        if(typeof(this.props.onFinishedEditing) === 'function') {
            this.props.onFinishedEditing(e)
        }
    }

    render() {
        console.log(this.props)
        return (
            <MapEditable
                onEndDrawing={this.onFinishedDrawing}
                onStartDrawing={this.onStartDrawing}
                onVertexMarkerDragEnd={this.onFinishedEditing}
            />
        )
    }
}

const withReducer = injectReducer(require('field/reducers/createFieldShape'))

const withConnect = connect(
    (state) => {
        const { shape, area} = selectCreateFieldShape(state) 
        return {
            shape,
            area
        }
    },
    (dispatch) => bindRoutineCreatorsAction({ createFieldShape }, dispatch, createFieldActionTypes),
  )

export default compose(
    withReducer,
    withConnect
)(MapCreateShape)

  