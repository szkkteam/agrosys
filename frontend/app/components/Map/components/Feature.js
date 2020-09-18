import React from 'react'
import { Polygon } from "react-leaflet";

export default class Feature extends React.Component 
{   

    _geoJsonToLatLong = (feature) => {
        let latLong = []
        // Fix latlongs
        feature.geometry.coordinates[0].map((location, index) => {
            latLong.push([location[1] , location[0]])
        })
        return latLong
    }
    

    onMouseHover = (data,e ) => {
        const { onMouseHover } = this.props
        onMouseHover && onMouseHover(data, e)
    }

    onClick = (data, e) => {
        e.originalEvent.view.L.DomEvent.stopPropagation(e)
        const { onClick } = this.props
        onClick && onClick(data,e )
    }

    render() {
        const { data, onClick, ...props } = this.props
        return(
            <Polygon                
                positions={this._geoJsonToLatLong(data.geometry)}
                onclick={this.onClick.bind(null, data)}
                onMouseOver={this.onMouseHover.bind(null, data)}
                {...props}
            />
        )
    }
}
