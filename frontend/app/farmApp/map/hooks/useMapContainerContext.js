import React, { useContext } from 'react'
import MapContainerContext from '../context/MapContainerContext'

export default () => {
    const context = useContext(MapContainerContext)
    if (!context) {
        throw new Error(
        `Map compound components cannot be rendered outside the MapContainer component`,
        )
    }
    return context
}