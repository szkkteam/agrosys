import { 
    listSeasonParcel,   
    createParcel,
    updateParcel,
    actionParcel,
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

import {
    selectSelectedSeasons
} from 'season/reducers/seasons'

export const KEY = 'parcels'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
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
        
        case updateParcel.SUCCESS:
            return {
                ...state,
                byId: {...byId, ...normalizeParcels(parcels).byId},
            }

        case actionParcel.ADD_PARCEL: 
            const { groupId, parcelId } = payload
            const parcelById = state.byId[groupId]
            return { 
                ...state,
                byId: { ...byId, [groupId]: {
                        ...parcelById,
                        parcels: parcelById.parcels.concat(parcelId)
                    }
                }
            }

        case createParcel.SUCCESS:
        case listSeasonParcel.SUCCESS:
            const flatData = normalizeParcels(parcels)
            console.log("createParcel flatData: ", flatData)
            return { ...state,
                byId: {...byId, ...flatData.byId},
                ids: state.ids.concat(flatData.ids),
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
        ...selectParcelTypesEntities(state),
        ...{ parcels: parcel.byId,  }
    }
}

export const selectParcelsList = (state) => {
    const parcels = selectParcels(state)
    return deNormalizeParcels({ ids: parcels.ids, entities: selectParcelsEntities(state) })

}

export const selectSeasonParcelsList = (state) => {
    const selected = selectSelectedSeasons(state) || null
    if (selected) {
        return selectParcelsListById(state, selected.referenceParcels)
    }
    return []
}


export const selectParcelsListById = (state, ids = []) => {
    return deNormalizeParcels({ ids, entities: selectParcelsEntities(state) })

}
