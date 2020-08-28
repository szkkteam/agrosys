import { 
    listParcelTypes
} from 'reference/actions'

import {
    normalizeReferenceParcelTypes,
    deNormalizeReferenceParcelTypes
} from 'reference/schemas'

export const KEY = 'parcelTypes'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { parcelTypes } = payload || {}
    const { byId } = state

    switch(type) {
        case listParcelTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listParcelTypes.SUCCESS:
            const flatData = normalizeReferenceParcelTypes(parcelTypes)
            return { ...state,
                byId: {...byId, ...flatData.byId},
                ids: flatData.ids,
                isLoaded: true,  
            }

        case listParcelTypes.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listParcelTypes.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectParcelTypes = (state) => state[KEY]

export const selectParcelTypesEntities = (state) => {
    const parcels = selectParcelTypes(state)
    return { referenceParcelTypes: parcels.byId,  } 
}

export const selectParcelTypesList = (state) => {
    const parcels = selectParcelTypes(state)
    return deNormalizeReferenceParcelTypes({ ids: parcels.ids, entities: selectParcelTypesEntities(state) })
}

