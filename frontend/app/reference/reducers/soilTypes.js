import { 
    listSoilTypes
} from 'reference/actions'
import { storage } from 'utils'

export const KEY = 'soilTypes'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: [],
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
            return { ...state,
                ids: soilTypes.map((soilType) => soilType.id),
                byId: soilTypes.reduce((byId, soilType) => {
                    byId[soilType.id] = soilType
                    return byId
                }, byId),
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
export const selectSoilTypesList = (state) => {
    const soils = selectSoils(state)
    return soils.ids.map((id) => soils.byId[id])
}