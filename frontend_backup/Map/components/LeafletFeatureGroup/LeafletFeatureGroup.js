import React from 'react'
import {
  LayerGroup,
  LayersControl,
} from "react-leaflet";

const { Overlay } = LayersControl

export default ({
    name,
    map,
    children,
    ...rest
}) => {
    return (
        <Overlay name={name} {...rest}>
            <LayerGroup>
                {children}
            </LayerGroup>
        </Overlay>
    )
}
