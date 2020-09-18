import React from 'react'

import {
    Feature,
    FeatureGroup
} from 'components/Map/components'

export default ({
    parcelsGrouped,
    onClick,
    ...rest,
}) => {        
    return (
        <React.Fragment>
            { parcelsGrouped && parcelsGrouped.map((agriculturalParcel, i) => {
                return (
                    <FeatureGroup 
                        checked={agriculturalParcel.enable}
                        key={`${i}`}
                        name={agriculturalParcel.title}
                        {...rest}
                    >
                        { agriculturalParcel.items.map((parcel, j) => (
                            <Feature
                                key={`${i}-${j}`}
                                {...agriculturalParcel.props}
                                onClick={onClick}
                                data={parcel}
                            />
                        )) }
                    </FeatureGroup>
                )
            }) }            
        </React.Fragment>  
    )    
} 
