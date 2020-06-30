import React, { createRef } from 'react'
import 'leaflet-editable'
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

    componentDidMount() {
        this.editRef.current.startPolygon()
    }

    drawPolygon = () => {
        this.editRef.current.startPolygon()
    }


  render() {
   
    return (
        <div>
            <LeafletEditable
                ref={this.editRef}
                //ref={this.mapRef}
            >
                <Map
                    ref={this.mapRef} 
                    center={[45.4, -75.7]}
                    zoom={12}
                    editable={true}
                >
                    <TileLayer
                        url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        id='mapbox.satellite'
                    />
                </Map>
            </LeafletEditable>
        </div>
    )
  }
}
