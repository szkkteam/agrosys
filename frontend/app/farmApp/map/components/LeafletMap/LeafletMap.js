import React, { useRef, useEffect } from 'react';
import Helmet from 'react-helmet'

import { 
    MapContainer,
    ZoomControl,
    Popup,
    TileLayer,
    LayersControl,
    Marker
} from "react-leaflet";


import { MAP_URL, MAP_ATTRIBUTION, MAP_DEFAULT_LAYER } from 'utils/map'


export default (props) => {
    const { 
        editable,
        children,
        startBounds,
        overlay,
        onMoveEnd,
        ...rest
    } = props

    console.log("MAP_URL: ", MAP_URL)

    const position = [51.505, -0.09]

    return (
        <React.Fragment>
            <Helmet>
                <link rel="stylesheet" href="//unpkg.com/leaflet@1.7.0/dist/leaflet.css" />
            </Helmet>
            <MapContainer
                center={position}
                zoom={12}
                //bounds={this.convertLatLngToBounds(startBounds)}
                //editable={editable}
                //onMoveEnd={this.onMoveEnd}
                zoomControl={false}
                doubleClickZoom={false}
                {...rest}
            >
                <TileLayer
                    url={MAP_URL}
                    attribution={MAP_ATTRIBUTION}
                    id={MAP_DEFAULT_LAYER}
                />
                {children}
            </MapContainer>
        </React.Fragment>
    )
}

/**
                <LeafletControl position="topcenter">
                    <div style={{backgroundColor: "white"}}>
                        <h1 >Placeholder</h1>
                        
                    </div>
                    
                </LeafletControl>
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>                               

 */