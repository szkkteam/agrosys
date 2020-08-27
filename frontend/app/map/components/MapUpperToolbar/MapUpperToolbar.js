import React from 'react'

import { 
    MapControl,
} from 'components/Map/components'


export default ({
    children,
    ...props,
}) => (
    <React.Fragment>
    <MapControl position="topleft">
        {children}
    </MapControl>
    </React.Fragment>

)
