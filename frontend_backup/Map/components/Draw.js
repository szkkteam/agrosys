import React, { Component } from 'react'

import { LeafletEditable } from 'components/Map/components'

import { getArea } from 'components/Map/utils'


const draw = (Component) => {
    class Draw extends React.Component {

        onUpdate = (e) => {
            const { onUpdate } = this.props
            const geoJson = e.layer.toGeoJSON()
            onUpdate && onUpdate({
                featureInEdit: {
                    area: getArea(geoJson),
                    geometry: geoJson,
                }
            })
        }

        onFinished = (e) => {
            const { onFinished } = this.props
            const geoJson = e.layer.toGeoJSON()
            const bounds = e.layer.getBounds()        
            // FIXME: finished drawing event is called when the user changes the page during drawing.
            // The event handler is called before the componenet dismounted and will return an invalid geojson and bounds
            if (Object.keys(bounds).length !== 0) {  
                onFinished && onFinished({
                    featureInEdit: {
                        area: getArea(geoJson),
                        geometry: geoJson,
                    },
                    bounds: bounds,
                })
            }
        }
        
        render() {            
            const {forwardedRef, ...rest} = this.props;
            return (
                <Component 
                    ref={forwardedRef}
                    onVertexMarkerDragEnd={this.onUpdate}
                    onEndDrawing={this.onFinished}
                    {...rest} 
                />
            )
        }
    }
    return React.forwardRef((props, ref) => {
        return <Draw {...props} forwardedRef={ref} />
    })
}

export default draw(LeafletEditable)
