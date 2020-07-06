import { createFields } from 'field/actions'

export const KEY = 'fields'

const initialState = {
    isLoading: false,
    isLoaded: false,
    selectedField: null,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case createFields.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case createFields.SUCCESS:
            return { ...state,
                selectedField: payload,
             }
        
        case createFields.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case createFields.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectFields = (state) => state[KEY]
