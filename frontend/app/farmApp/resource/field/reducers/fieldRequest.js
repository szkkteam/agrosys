import { listField } from '../actions'

export const KEY = 'fieldRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listField.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listField.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listField.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listField.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectFieldRequest = (state) => state[KEY]