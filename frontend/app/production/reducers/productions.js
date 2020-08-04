import { listProductions } from 'production/actions'

export const KEY = 'production'

const initialState = {
    // listFields
    isLoading: false,
    isLoaded: false,
    productions: [],
    ids: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { productions } = payload || []

    switch(type) {
        case listProductions.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listProductions.SUCCESS:
            return { ...state,
                isLoaded: true,
                productions: productions,
                ids: productions.map((productions) => productions.id),
            }

        case listProductions.SUCCESS:
            return { ...state,
                isLoaded: false,
             }
        
        case listProductions.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listProductions.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectProductions = (state) => state[KEY]
export const selectProductionsList = (state) => {
    const production = selectProductions(state)
    return production.productions
}
