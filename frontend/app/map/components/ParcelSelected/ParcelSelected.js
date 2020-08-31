import React from 'react'

import {
    Feature,
} from 'components/Map/components'

export default ({
    parcel,
    onClick,
    ...rest,
}) => {

    return (
        <React.Fragment>
            { parcel? 
                <Feature
                    color="white"
                    onClick={onClick}
                    data={parcel}
                />
                : null}
        </React.Fragment>
    )    
}  
