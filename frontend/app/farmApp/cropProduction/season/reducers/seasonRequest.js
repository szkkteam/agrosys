import { listSeason } from '../actions'
import { listUserCrop } from 'farmApp/cropProduction/crop/actions'

export const KEY = 'seasonRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listUserCrop.REQUEST:
        case listSeason.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listUserCrop.SUCCESS:
        case listSeason.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listUserCrop.FAILURE:
        case listSeason.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listUserCrop.FULFILL:
        case listSeason.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectSeasonRequest = (state) => state[KEY]