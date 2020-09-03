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
    parcels: { keys, data },
    onClick,
    parcelTypes,
    ...rest,
}) => {        
    return (
        <React.Fragment>
            { Object.keys(data).length? keys.map((key, i) => (
                // Lookup the parcel type title based on its code.
                <FeatureGroup key={`${key}-${i}`} name={parcelTypes.find(x => x.code == key).title} {...rest}>
                    { data[key] && data[key]                        
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