import React from 'react'

import { 
    MapControl,
} from 'components/Map/components'


export default ({
    children,
    ...props,
}) => (
    <React.Fragment>
    <MapControl position="topleft" options={{className: "map-uppertoolbar"}}>
        {children}
    </MapControl>
    </React.Fragment>

)
