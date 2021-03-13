import { useMap } from "react-leaflet"
import React, { useMemo } from 'react'

export default (feature) => {

    return useMemo(() => {
        let latLong = []
        // Fix latlongs
        let geometry = null
        if ('features' in feature) {
            geometry = feature.features[0].geometry
        } else {
            geometry = feature.geometry
        }
        geometry.coordinates[0].map((location, index) => {
            latLong.push([location[1] , location[0]])
        })
        return latLong
    }, [feature])
}

