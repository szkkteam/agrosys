import { 
    listSeasonParcel,   
    createSeasonParcel,
} from 'parcel/actions'

import {
    normalizeParcels,
    deNormalizeParcels
} from 'parcel/schemas'

import {
    selectParcelTypesEntities,
} from 'reference/reducers/parcelTypes'

import {
    selectSoilTypesEntities,
} from 'reference/reducers/soilTypes'

export const KEY = 'parcels'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { parcels } = payload || {}
    const { byId } = state
    

    switch(type) {
        case listSeasonParcel.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case createSeasonParcel.SUCCESS:
        case listSeasonParcel.SUCCESS:
            const flatData = normalizeParcels(parcels)
            return { ...state,
                byId: {...byId, ...flatData.byId},
                ids: flatData.ids,
                isLoaded: true,  
            }

        case listSeasonParcel.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasonParcel.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectParcels = (state) => state[KEY]


export const selectParcelsEntities = (state) => {
    const parcel = selectParcels(state)
    return {
        ...selectSoilTypesEntities(state),
        ...selectSoilTypesEntities(state),
        ...{ parcels: parcel.byId,  }
    }
}

export const selectParcelsList = (state) => {
    const parcels = selectParcels(state)
    return deNormalizeParcels({ ids: parcels.ids, entities: selectParcelsEntities(state) })

}

export const selectParcelsListById = (state, ids = []) => {
    return deNormalizeParcels({ ids, entities: selectParcelsEntities(state) })

}
