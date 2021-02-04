import { listUserCrop } from '../actions'

export const KEY = 'userCropRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listUserCrop.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listUserCrop.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listUserCrop.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listUserCrop.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectUserCropRequest = (state) => state[KEY]