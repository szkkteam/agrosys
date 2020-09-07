import { 
    listAgriculturalTypes
} from 'reference/actions'

export const KEY = 'agriculturalTypes'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { byId: agriculturalTypesById, ids } = payload || {}
    const { byId } = state

    switch(type) {
        case listAgriculturalTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listAgriculturalTypes.SUCCESS:
            return { ...state,
                byId: {...byId, ...agriculturalTypesById},
                ids: _.uniq([...state.ids, ...ids]),
                isLoaded: true,  
            }

        case listAgriculturalTypes.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listAgriculturalTypes.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectAgriculturalTypes = (state) => state[KEY]
export const selectAgriculturalTypesIds = (state) => selectAgriculturalTypes(state).ids
export const selectAgriculturalTypesbyId = (state) => selectAgriculturalTypes(state).byId
