import { 
    listProductions,
    listParcelProduction,
} from 'production/actions'

export const KEY = 'productions'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { productions: productionsById, ids } = payload || {}
    const { byId } = state

    switch(type) {

        case listProductions.REQUEST:
        case listParcelProduction.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listProductions.SUCCESS:
        case listParcelProduction.SUCCESS:
            return { ...state,
                byId: {...byId, ...productionsById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
            }

        case listProductions.FAILURE:
        case listParcelProduction.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listProductions.FULFILL:
        case listParcelProduction.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectProductions = (state) => state[KEY]
export const selectProductionIds = (state) => state[KEY].ids
export const selectProductionsById = (state) => state[KEY].byId

