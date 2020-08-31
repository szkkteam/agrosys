import React from 'react'

import { Map,
    ZoomControl,
    Popup,
    TileLayer,
    LayersControl,
    LayerGroup
} from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl

export default class LeafletMap extends React.Component {

    componentDidMount() {
        this.map = this.mapInstance.leafletElement
    }

    componentDidUpdate(prevProps, prevState) {
        // FIXME: Comparing prevEvents and thisEvents will be always the same. Why?
        this.props.events && this.props.events.map((event, id) => (
            this.handleEvents(event)
        ))        
    }

    flyTo = ({bounds}) => {
        //console.log("flyTo: ", bounds)
        this.map.flyToBounds(bounds)
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
        //console.log("onMoveEnd: ", e)
        const { mapEventAction, mapViewportAction, events } = this.props
        
        events.length && mapEventAction && mapEventAction.clearEvents()
        mapViewportAction && mapViewportAction.changed({
            viewPortChange: this.map.getBounds(),
        })
    }

    render() {
        const { editable, children, startBounds, overlay, ...props } = this.props
        return (
            <Map 
                ref={e => { this.mapInstance = e }}
                center={[45.4, -75.7]}
                zoom={12}
                bounds={startBounds}
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
        )
    }
}
