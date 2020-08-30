import React from 'react'
import { GeoJSON } from "react-leaflet";

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

    onEachFeature = (data, feature, layer) => {
        layer.on({
            mouseover: this.onMouseHover.bind(null, data),
            click: this.onClick.bind(null, data),
        })
    }

    render() {
        const { data } = this.props
        return(
            <GeoJSON 
                key={data.id}
                data={data.geometry}
                onEachFeature={this.onEachFeature.bind(null, data)}
            />
        )
    }
}
