import React from 'react'

import {
    Feature,
} from 'components/Map/components'

export default ({
    data,
    onClick,
    color="white",
    ...rest,
}) => {
    return (
        <React.Fragment>
            { data && 
                <Feature
                    //color="white"
                    color={color}
                    onClick={onClick}
                    data={data}
                />
            }
        </React.Fragment>
    )    
}  
