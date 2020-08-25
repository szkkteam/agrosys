import React from 'react'

import { 
    MapControl,
} from 'components/Map/components'

import {
    SplitButton
} from 'components/Button'

export default ({
    buttons,
}) => (
    <React.Fragment>
    <MapControl position="topleft">
        <SplitButton
            handleClick={(e, i) => console.log("Button Clicked: ", i)}
            options={buttons}
        />
    </MapControl>
    </React.Fragment>

)
