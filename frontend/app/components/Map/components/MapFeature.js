import React from 'react'
import { GeoJSON } from "react-leaflet";


export default class MapFeature extends React.Component 
{   
    constructor(props) {
        super(props)

        this.state = {
            field: this.props.field
        }
    }

    onMouseHover = (e) => {
        const { onMouseHover } = this.props
        onMouseHover && onMouseHover(this.state.field, e)
    }

    onClick = (e) => {
        const { onClick } = this.props
        onClick && onClick(this.state.field, e)
    }

    onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: this.onMouseHover,
            click: this.onClick,
        })
    }

    render() {
        const { field } = this.props
        // Get the last field detail
        const lastFieldDetail = field.fields[field.fields.length - 1]
        return(
            <GeoJSON 
                key={field.id}
                data={lastFieldDetail.shape}
                onEachFeature={this.onEachFeature}
            />
        )
    }
}
