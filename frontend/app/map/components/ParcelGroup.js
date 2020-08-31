import React from 'react'

import {
    Feature,
    FeatureGroup
} from 'components/Map/components'

export default ({
    parcels,
    onClick,
    ...rest,
}) => {
    const byParcelType = parcels.reduce((grouped, parcel) => {
        if (!parcel.referenceParcelType) { return grouped} 
        let item = grouped[parcel.referenceParcelType.title] || []
        item.push(parcel)
        grouped[parcel.referenceParcelType.title] = item
        return grouped
    }, {})
    //console.log("byParcelType: ", byParcelType)
    return (
        <React.Fragment>
            { Object.keys(byParcelType).length? Object.keys(byParcelType).map((key, i) => (
                <FeatureGroup key={`${key}-${i}`} name={key} {...rest}>
                    { byParcelType[key] && byParcelType[key].map((parcel, i) => (
                        <Feature
                            key={i}
                            onClick={onClick}
                            data={parcel}
                        />
                    )) }
                </FeatureGroup>       
            )) : null }
        </React.Fragment>        
    )    
}  

