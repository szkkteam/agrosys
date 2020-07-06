import React from 'react'

import { Map, Marker, Popup, TileLayer } from "react-leaflet";


export default class LeafletMap extends React.Component {

    componentDidMount() {
        this.map = this.mapInstance.leafletElement
    }

    flyTo = ({bounds}) => {
        this.map.flyToBounds(bounds)
    }

    handleEvents = ({type, config}) => {
        switch(type) {
            case "fly-to-bounds":
                this.flyTo(config)                
                break
            
            default:
                break
        }
        // TODO: Clear events
    }
    
    onMoveEnd = (e) => {
        const { mapEventAction, events } = this.props
        events.length && mapEventAction && mapEventAction.clearEvents()
        //console.log("Moveend: ",e)
    }

    render() {
        const { editable, events } = this.props
        events && events.map((event, id) => (
            this.handleEvents(event)
        ))

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
                {this.props.children}
            </Map>
        )
    }
}
