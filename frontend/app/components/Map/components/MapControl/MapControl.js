import React from 'react'
import Control from 'react-leaflet-control';

export default ({
    children,
    position = "topright",
    ...props
}) => (
    <Control
        position={position}
        {...props}
    >
        <div>
            {children}
        </div>
    </Control>
)
