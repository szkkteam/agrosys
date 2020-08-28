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
    const { soilTypes } = payload || {}
    const { byId } = state
    switch(type) {
        case listSoilTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSoilTypes.SUCCESS:
            const flatData = normalizeSoilTypes(soilTypes)
            return { ...state,
                byId: {...byId, ...flatData.byId},
                ids: flatData.ids,
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

export const selectSoilTypesEntities = (state) => {
    const soils = selectSoilsTypes(state)
    return { soilTypes: soils.byId  } 
}

export const selectSoilTypesList = (state) => {
    const soils = selectSoilsTypes(state)
    return deNormalizeSoilTypes({ ids: soils.ids, entities: selectSoilTypesEntities(state) })

}