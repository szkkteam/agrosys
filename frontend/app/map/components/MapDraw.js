import React from 'react'

import { LeafletEditable } from 'map/components'

import { getArea } from 'map/utils'

export default class MapDraw extends React.Component {

    onFinishedDrawing = (e) => {
        const { mapEditAction, mapEventAction } = this.props
        const geoJson = e.layer.toGeoJSON()

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
                    bounds: e.layer.getBounds(),
                }
            }
        })

        if (e.layer.dragging) {
            e.layer.dragging.disable()
        }

        // TODO: 
        // map/EDITABLE_FEATURE_DRAW_FINISHED()

        //console.log(e.layer.dragging)
        //console.log(e.layer.toGeoJSON())

        // TODO: Put this to mapcontrol component
        //e.layer._map.flyToBounds(e.layer.getBounds())
        //e.layer._map.doubleClickZoom.enable(); 
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
