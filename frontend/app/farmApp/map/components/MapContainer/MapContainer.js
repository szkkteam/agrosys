import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LeafletMap from '../LeafletMap/LeafletMap'
import MapControlZoom from '../MapControlZoom/MapControlZoom'

import MapContainerContext from '../../context/MapContainerContext'
import MapEventHandler from '../MapEventHandler/MapEventHandler'


const Container = styled.div`
    position: relative;
    flex: 1 1 auto;
    min-height: 100%;
`

const Map = styled(LeafletMap)`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`

const MapContainer = ({
    mapProps={},
    controls,
    children
}) => {
    const [mapRef, setMapRef] = useState(null)

    console.debug("Map: ", mapRef)

    const contextObject = {
        mapRef,
    }

    return (
        <Container>
            <MapContainerContext.Provider value={contextObject}>
                <Map
                    whenCreated={setMapRef}
                    {...mapProps}
                >
                    <MapEventHandler />
                    {children}
                </Map>
                <MapControlZoom>
                    
                </MapControlZoom>
                {controls}
            </MapContainerContext.Provider>
        </Container>
        
    )
}

MapContainer.propTypes = {

}

export default MapContainer