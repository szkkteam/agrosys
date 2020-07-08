import React from 'react'

import { LeafletEditable } from 'map/components'

import { getArea } from 'map/utils'

export default class MapDraw extends React.Component {

    componentWillUnmount() {
        const { mapEditAction } = this.props
        mapEditAction && mapEditAction.clear()
    }

    onFinishedDrawing = (e) => {
        const { mapEditAction, mapEventAction } = this.props
        const geoJson = e.layer.toGeoJSON()
        const bounds = e.layer.getBounds()
        // FIXME: finished drawing event is called when the user changes the page during drawing.
        // The event handler is called before the componenet dismounted and will return an invalid geojson and bounds
        if (Object.keys(bounds).length !== 0) {  
            mapEditAction && mapEditAction.drawFinished({
                featureInEdit: {
                    area: getArea(geoJson),
                    shape: geoJson,
                }
            })
    
            mapEventAction && mapEventAction.addEvent({
                eventRequest: {
                    type: "fly-to-bounds",
                    config: {
                        bounds: bounds,
                    }
                }
            })
            // Disable dragging features on layer
            if (e.layer.dragging) {
                e.layer.dragging.disable()
            }
    
        }
    }

    onStartDrawing = (e) => {
        const { mapEditAction } = this.props
        mapEditAction && mapEditAction.drawStarted()
        // TODO: Put this to the MapControl component
        //e.editTools.map.doubleClickZoom.disable(); 
    }

    onFinishedEditing = (e) => {
        const { mapEditAction } = this.props
        const geoJson = e.layer.toGeoJSON()
        console.log("geoJson: ", geoJson)
        mapEditAction && mapEditAction.featureModified({
            featureInEdit: {
                area: getArea(geoJson),
                shape: geoJson,
            }
        })
    }

    render() {
        const { feature, mapEditAction } = this.props
        return (
            <LeafletEditable
                onEndDrawing={this.onFinishedDrawing}
                onStartDrawing={this.onStartDrawing}
                onVertexMarkerDragEnd={this.onFinishedEditing}
            />
        )
    }
}
