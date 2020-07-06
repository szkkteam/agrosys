import { listSoilTypes } from 'soil/actions'

export const KEY = 'soil'

const initialState = {
    isLoading: false,
    isLoaded: false,
    soilTypes: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { soilTypes } = payload || {}
    
    switch(type) {
        case listSoilTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSoilTypes.SUCCESS:
            return { ...state,
                soilTypes: soilTypes,
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

export const selectSoilTypes = (state) => state[KEY]
export const selectSoilTypesList = (state) => {
    const soils = selectSoilTypes(state)
    return soils.soilTypes
}