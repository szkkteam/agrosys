import React from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreatorsAction } from 'actions'
import { injectReducer } from 'utils/async'

import { 
    mapEdit,
    mapEvents,
    mapEditFeatureActionsTypes,
    mapEventActionsTypes,
} from 'map/actions'

import { selectMap } from 'map/reducer'

import { LeafletEditable } from 'map/components'

import { getArea } from 'map/utils'

export default class MapEditFeature extends React.Component {

    onFinishedDrawing = (e) => {
        const { onFinished } = this.props
        const geoJson = e.layer.toGeoJSON()
        const bounds = e.layer.getBounds()        
        // FIXME: finished drawing event is called when the user changes the page during drawing.
        // The event handler is called before the componenet dismounted and will return an invalid geojson and bounds
        if (Object.keys(bounds).length !== 0) {  
            // Disable dragging features on layer
            if (e.layer.dragging) {
                e.layer.dragging.disable()
            }

            onFinished && onFinished({
                featureInEdit: {
                    area: getArea(geoJson),
                    shape: geoJson,
                },
                bounds: bounds,
            })

    
        }
    }

    onStartDrawing = (e) => {
        const { onStart } = this.props
        onStart && onStart()
        // TODO: Put this to the MapControl component
        //e.editTools.map.doubleClickZoom.disable(); 
    }

    onFinishedEditing = (e) => {
        const { onEdit } = this.props
        const geoJson = e.layer.toGeoJSON()
        onEdit && onEdit({
            featureInEdit: {
                area: getArea(geoJson),
                shape: geoJson,
            }
        })
    }

    onFeatureAdded = ({layer}) => {
        const { onAdd } = this.props
        onAdd && onAdd({
            bounds: layer.getBounds(),
        })
        
    }

    render() {
        const { ...rest } = this.props
        return (
            <LeafletEditable
                onEndDrawing={this.onFinishedDrawing}
                onStartDrawing={this.onStartDrawing}
                onVertexMarkerDragEnd={this.onFinishedEditing}
                onFeatureAdded={this.onFeatureAdded}
                {...rest}
            />
        )
    }
}
