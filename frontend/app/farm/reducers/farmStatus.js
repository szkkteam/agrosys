import { listFarms } from 'farm/actions'

export const KEY = 'farmStatus'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listFarms.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listFarms.SUCCESS:
            return { ...state,
                isLoaded: true,
            }
        
        case listFarms.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listFarms.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectFarmStatus = (state) => state[KEY]