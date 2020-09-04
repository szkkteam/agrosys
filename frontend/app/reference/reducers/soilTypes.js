import { createSelector } from 'reselect'

import { 
    listSoilTypes
} from 'reference/actions'

import {
    normalizeSoilTypes,
    deNormalizeSoilTypes
} from 'reference/schemas'

export const KEY = 'soilTypes'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { byId: soilTypesById, ids } = payload || {}
    const { byId } = state
    switch(type) {
        case listSoilTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSoilTypes.SUCCESS:
            return { ...state,
                byId: {...byId, ...soilTypesById},
                ids: _.uniq([...state.ids, ...ids]),
                isLoaded: true,  
            }

        case listSoilTypes.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSoilTypes.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectSoilsTypes = (state) => state[KEY]
export const selectSoilsTypeIds = (state) => selectSoilsTypes(state).ids
export const selectSoilsTypesbyId = (state) => selectSoilsTypes(state).byId

export const getSoilTypes = createSelector(
    [
        selectSoilsTypeIds,
        selectSoilsTypesbyId,
    ],
    (soilTypeIds, soilTypes) => {
        return deNormalizeSoilTypes({ ids: soilTypeIds, ...{entities: {soilTypes}}})
    }
)