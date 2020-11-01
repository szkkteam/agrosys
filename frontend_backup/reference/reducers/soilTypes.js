import { 
    listSoilTypes
} from 'reference/actions'

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
    const { soilTypes: soilTypesById, ids } = payload || {}
    const { byId } = state
    switch(type) {
        case listSoilTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSoilTypes.SUCCESS:
            return { ...state,
                byId: {...byId, ...soilTypesById},
                ids: _.uniq(_.concat(state.ids, ids)),
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
export const selectSoilsTypeIds = (state) => state[KEY].ids
export const selectSoilsTypesbyId = (state) => state[KEY].byId
