import React from 'react'

import {
    Feature,
} from 'components/Map/components'

export default ({
    parcel,
    onClick,
    color="white",
    ...rest,
}) => {

    return (
        <React.Fragment>
            { parcel? 
                <Feature
                    //color="white"
                    color={color}
                    onClick={onClick}
                    data={parcel}
                />
                : null}
        </React.Fragment>
    )    
}  
