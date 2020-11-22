import React from 'react'

import {
    LeafletFeature,
    LeafletFeatureGroup
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
                    <LeafletFeatureGroup 
                        checked={agriculturalParcel.enable}
                        key={`${i}`}
                        name={agriculturalParcel.title}
                        {...rest}
                    >
                        { agriculturalParcel.items.map((parcel, j) => (
                            <LeafletFeature
                                key={`${i}-${j}`}
                                {...agriculturalParcel.props}
                                onClick={onClick}
                                data={parcel}
                            />
                        )) }
                    </LeafletFeatureGroup>
                )
            }) }            
        </React.Fragment>  
    )    
} 
