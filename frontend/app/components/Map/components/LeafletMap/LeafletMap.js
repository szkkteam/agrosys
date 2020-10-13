import React from 'react'

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

    constructor(props) {
        super(props)

        this.state = {
            height: 800,
        }
    }

    componentDidMount() {
        this.map = this.mapInstance.leafletElement
        const { startBounds } = this.props
        this.fitTo({
            bounds: startBounds,
        })
        window.addEventListener("resize", this.updateDimensions)
    }

    componentDidUpdate(prevProps, prevState) {
        // FIXME: Comparing prevEvents and thisEvents will be always the same. Why?
        this.props.events && this.props.events.map((event, id) => (
            this.handleEvents(event)
        ))        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
      }

    updateDimensions = () => {
        const height = window.innerWidth >= 992 ? window.innerHeight : 400        
        this.setState({ height: height })
      }

    flyTo = ({bounds}) => {
        bounds && this.map.flyToBounds(bounds)
    }

    fitTo = ({bounds}) => {
        bounds && this.map.fitBounds(bounds)
    }

    handleEvents = ({type, config}) => {
        switch(type) {
            case "fly-to-bounds":
                config && this.flyTo(config)                
                break
            
            default:
                break
        }
    }
    
    onMoveEnd = (e) => {
        const { mapEventAction, mapViewportAction, events } = this.props
        
        events.length && mapEventAction && mapEventAction.clear()
        mapViewportAction && mapViewportAction.changed({
            viewPortChange: this.map.getBounds(),
        })
    }

    convertLatLngToBounds = (latlngs) => {
        try {
            const c1 = L.latLng(startBounds._northEast)
            const c2 = L.latLng(startBounds._southWest)
            return L.latLngBounds(c1, c2)
        } catch (e) {
            log_error("startBounds given to map is invalid: ", latlngs)
        }
    }

    render() {
        const { editable, children, startBounds, overlay, ...props } = this.props
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
