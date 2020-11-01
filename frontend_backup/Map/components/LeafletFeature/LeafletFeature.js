import React from 'react'
import { Polygon } from "react-leaflet";
import { geoJsonToLatLong } from 'components/Map/utils'

export default class Feature extends React.Component 
{   

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
                positions={geoJsonToLatLong(data.geometry)}
                onclick={this.onClick.bind(null, data)}
                onMouseOver={this.onMouseHover.bind(null, data)}
                {...props}
            />
        )
    }
}
