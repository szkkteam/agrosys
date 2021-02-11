import { listSeason } from '../actions'

export const KEY = 'seasonRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listSeason.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listSeason.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listSeason.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listSeason.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectSeasonRequest = (state) => state[KEY]