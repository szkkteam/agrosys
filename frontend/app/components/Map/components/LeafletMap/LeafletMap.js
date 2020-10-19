import React, { useState, useEffect } from 'react';

import { Map,
    ZoomControl,
    Popup,
    TileLayer,
    LayersControl,
    LayerGroup
} from "react-leaflet";
import * as L from 'leaflet'

import { log_error } from 'logging'

import './leafletmap.scss'

const { BaseLayer, Overlay } = LayersControl

export default class LeafletMap extends React.Component {
    /*
    constructor(props) {
        super(props)
        
        this.state = {
            height: 800,
        }
    }
    */

    componentDidMount() {
        this.map = this.mapInstance.leafletElement
        const { startBounds } = this.props
        this.fitTo({
            bounds: startBounds,
        })
        //window.addEventListener("resize", this.updateDimensions)
    }

    /*
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
      }

    updateDimensions = () => {
        const height = window.innerWidth >= 992 ? window.innerHeight : 400        
        this.setState({ height: height })
      }
      */

    flyTo = ({bounds}) => {
        console.log("flyTo-bounds: ", bounds)
        bounds && this.map.flyToBounds(bounds)
    }

    fitTo = ({bounds}) => {
        console.log("fitTo-bounds: ", bounds)
        bounds && this.map.fitBounds(bounds)
    }

    onMoveEnd = (e) => {
        const { onMoveEnd } = this.props
        onMoveEnd && onMoveEnd(this.map.getBounds())
    }

    render() {
        const { 
            editable,
            children,
            startBounds,
            overlay,
            onMoveEnd,
            ...props
        } = this.props

        return (
            <div style={{height: "900px", position: "relative"}}>
                <Map 
                    ref={e => { this.mapInstance = e }}
                    center={[45.4, -75.7]}
                    zoom={12}
                    //bounds={this.convertLatLngToBounds(startBounds)}
                    editable={editable}
                    onMoveEnd={this.onMoveEnd}
                    zoomControl={false}
                    doubleClickZoom={false}
                    {...props}
                >
                    <ZoomControl
                        position="topright"
                    />
                    <LayersControl position="topright">
                        <BaseLayer checked name="Satelite">
                            <TileLayer
                                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                                id='mapbox.satellite'
                            />
                        </BaseLayer>
                        {overlay}
                    </LayersControl>                
                    {children}
                </Map>
            </div>
        )
    }
}
