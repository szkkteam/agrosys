import { createFields, listFields } from 'field/actions'

export const KEY = 'fields'

const initialState = {
    // listFields
    isLoading: false,
    isLoaded: false,
    fields: [],
    // createFields
    selectedField: null,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { fields } = payload || []

    switch(type) {
        case listFields.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listFields.SUCCESS:
            return { ...state,
                isLoaded: true,
                fields: fields,
            }

        case createFields.SUCCESS:
            return { ...state,
                isLoaded: false,
                selectedField: payload,
             }
        
        case listFields.FAILURE:
        case createFields.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listFields.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectFields = (state) => state[KEY]
