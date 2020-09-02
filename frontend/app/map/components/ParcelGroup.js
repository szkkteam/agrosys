import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { listParcelTypes } from 'reference/actions'
import { selectParcelTypesList } from 'reference/reducers/parcelTypes'

import {
    parcelTypesEnum
} from 'reference/constants'

const groupOrder = [
    parcelTypesEnum.PHYSICAL_BLOCK,
    parcelTypesEnum.FARMERS_BLOCK,
    parcelTypesEnum.CADASTRAL_PARCEL,
    parcelTypesEnum.AGRICULTURAL_PARCEL,
]

import {
    Feature,
    FeatureGroup
} from 'components/Map/components'

const ParcelGroup = ({
    parcels,
    onClick,
    parcelTypes,
    ...rest,
}) => {    
    // Sort the parcels based on their size. The default behaviour when a polygon is added to the layer is to adding it to the top.
    // To make sure the user can select layer's painted on layers the order need to be changed based on the area, to build the sequence from the largest to the smallest.
    const sortedParcel = [].concat(parcels).sort((a, b) => parseFloat(a.totalArea) > parseFloat(b.totalArea)? -1 : 1)
    const byParcelType = sortedParcel.reduce((grouped, parcel) => {        
        if (!parcel.referenceParcelType) { return grouped}         
        let item = grouped[parcel.referenceParcelType.code] || []
        item.push(parcel)
        grouped[parcel.referenceParcelType.code] = item
        return grouped
    }, {})
    let keys = []
    // Make an inner join between keys where the order is fixed. Eg: Phyiscal block -> Farmers block -> Cadastrial parcel -> Agricultural parcel
    groupOrder.map((item) => item in byParcelType? keys.push(item): null )

    return (
        <React.Fragment>
            { Object.keys(byParcelType).length? keys.map((key, i) => (
                // Lookup the parcel type title based on its code.
                <FeatureGroup key={`${key}-${i}`} name={parcelTypes.find(x => x.code == key).title} {...rest}>
                    { byParcelType[key] && byParcelType[key]                        
                        .map((parcel, i) => (
                                <Feature
                                    key={i}
                                    onClick={onClick}
                                    data={parcel}
                            /> )
                    ) }
                </FeatureGroup>       
            )) : null }
        </React.Fragment>  
    )    
} 

const withConnect = connect(
  (state) => ({parcelTypes: selectParcelTypesList(state) }),
  (dispatch) => bindRoutineCreators({ listParcelTypes }, dispatch),
)

export default compose(
  withConnect,
)(ParcelGroup)