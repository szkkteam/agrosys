import React, { createRef } from 'react'

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import LeafletEditable from '../LeafletEditable'

import 'highlight.js/styles/tomorrow-night-eighties.css'


export default class EditableMap extends React.Component {
    constructor() {
        super()
        this.editRef = createRef();
        this.mapRef = createRef();
    }

    drawPolygon = () => {
        this.editRef.current.startPolygon()
    }


  render() {
   
    return (
        <LeafletEditable
            ref={this.mapRef}
        >
            <Map
                ref={this.mapRef} 
                center={[45.4, -75.7]}
                zoom={12}
                editable={true}>
                <button
                    onClick={this.drawPolygon}
                    className="editable-btn"
                >Polygon</button>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        </LeafletEditable>
    )
  }
}
