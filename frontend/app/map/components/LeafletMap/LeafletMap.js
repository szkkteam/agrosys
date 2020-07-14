import React from 'react'

import { Map, Marker, Popup, TileLayer } from "react-leaflet";


export default class LeafletMap extends React.Component {

    static defaultProps = {
        enableDoubleClickZoom: true,
    }

    componentDidMount() {
        const { startBounds } = this.props
        this.map = this.mapInstance.leafletElement
        startBounds && this.map.flyToBounds(startBounds)
    }

    componentDidUpdate(prevProps, prevState) {
        // FIXME: Comparing prevEvents and thisEvents will be always the same. Why?
        this.props.events && this.props.events.map((event, id) => (
            this.handleEvents(event)
        ))
        // FIXME: Double click zoom is still not working with draw double click.
        if (this.props.enableDoubleClickZoom) {
            this.map.doubleClickZoom.enable()
        } else {
            this.map.doubleClickZoom.disable()
        }
    }

    flyTo = ({bounds}) => {
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
        const { mapEventAction, mapViewportAction, events } = this.props
        events.length && mapEventAction && mapEventAction.clearEvents()
        mapViewportAction && mapViewportAction.changed({
            viewPortChange: this.map.getBounds(),
        })
    }

    render() {
        const { editable, children } = this.props
        return (
            <Map 
                ref={e => { this.mapInstance = e }}
                center={[45.4, -75.7]}
                zoom={12}
                editable={editable}
                onMoveEnd={this.onMoveEnd}
            >
                <TileLayer
                    url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    id='mapbox.satellite'
                />
                {children}
            </Map>
        )
    }
}
