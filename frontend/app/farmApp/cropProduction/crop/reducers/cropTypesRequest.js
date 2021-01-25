import { listCropType } from '../actions'

export const KEY = 'cropTypesRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listCropType.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listCropType.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listCropType.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listCropType.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectCropTypesRequest = (state) => state[KEY]