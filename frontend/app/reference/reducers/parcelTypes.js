import { createSelector } from 'reselect'

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
    const { byId: parcelTypesById, ids } = payload || {}
    const { byId } = state

    switch(type) {
        case listParcelTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listParcelTypes.SUCCESS:
            return { ...state,
                byId: {...byId, ...parcelTypesById},
                ids: _.uniq([...state.ids, ...ids]),
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
export const selectParcelTypesIds = (state) => selectParcelTypes(state).ids
export const selectParcelTypesbyId = (state) => selectParcelTypes(state).byId

export const getReferenceParcelTypes = createSelector(
    [
        selectParcelTypesIds,
        selectParcelTypesbyId,
    ],
    (parcelTypeIds, referenceParcelTypes) => {
        return deNormalizeReferenceParcelTypes({ ids: parcelTypeIds, ...{entities: {referenceParcelTypes}}})
    }
)