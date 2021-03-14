import { listTask } from '../actions'

export const KEY = 'taskRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listTask.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listTask.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listTask.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listTask.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectTaskRequest = (state) => state[KEY]