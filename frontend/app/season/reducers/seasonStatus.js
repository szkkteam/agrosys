import { 
    listSeasons,
} from 'season/actions'

export const KEY = 'seasonStatus'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listSeasons.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSeasons.SUCCESS:
            return { ...state,
                isLoaded: true,  
            }

        case listSeasons.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasons.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectSeasonStatus = (state) => state[KEY]