import React from 'react'
import Control from 'react-leaflet-control';

import {
    FormParcel,
} from 'parcel/components'

export default ({
    children,
    ...props,
}) => (
    <Control
        position="topleft"
        options={{className: "map-uppertoolbar"}}
    >
        {children}
    </Control>
)
