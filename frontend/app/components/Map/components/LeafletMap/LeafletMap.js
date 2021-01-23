import React, { useRef, useEffect } from 'react';
import Helmet from 'react-helmet'

import { 
    MapContainer,
    ZoomControl,
    Popup,
    TileLayer,
    LayersControl,
    LayerGroup
} from "react-leaflet";
import * as L from 'leaflet'

import { MAP_URL, MAP_ATTRIBUTION, MAP_DEFAULT_LAYER } from 'utils/map'

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
        this.fitTo({ bounds: startBounds })
        //window.addEventListener("resize", this.updateDimensions)
        /*
        setTimeout(() => {
            this.map.invalidateSize(false);
            console.log("Map reloaded")
          }, 1000);
          */
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

    flyTo = ({bounds}) => bounds && this.map.flyToBounds(bounds)

    fitTo = ({bounds}) => bounds && this.map.fitBounds(bounds)

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
            className="map-fullscreen",
            ...props
        } = this.props

        console.log("MAP_URL: ", MAP_URL)

        return (
            <React.Fragment>
                <Helmet>
                    <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
                </Helmet>
                <MapContainer
                    ref={e => { this.mapInstance = e }}
                    center={[45.4, -75.7]}
                    zoom={12}
                    //bounds={this.convertLatLngToBounds(startBounds)}
                    //editable={editable}
                    onMoveEnd={this.onMoveEnd}
                    zoomControl={false}
                    doubleClickZoom={false}
                    className={className}
                    {...props}
                >
                    <ZoomControl
                        position="topright"
                    />
                    <LayersControl position="topright">
                        <BaseLayer checked name="Satelite">
                            <TileLayer
                                url={MAP_URL}
                                attribution={MAP_ATTRIBUTION}
                                id={MAP_DEFAULT_LAYER}
                            />
                        </BaseLayer>
                        {overlay}
                    </LayersControl>                
                    {children}
                </MapContainer>
            </React.Fragment>
        )
    }
}
