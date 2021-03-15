import { listCropPlan } from '../actions'

export const KEY = 'cropPlanRequest'

const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listCropPlan.REQUEST: 
            return { ...state,
                isLoading: true,
            }

        case listCropPlan.SUCCESS: 
            return { ...state, 
                isLoaded: true,
            }

        case listCropPlan.FAILURE:
            return { ...state,
                error: payload.error,
            }

        case listCropPlan.FULFILL:
            return { ...state,
                isLoading: false,
            }
        
        default:
            return state
    }
}

export const selectCropPlanRequest = (state) => state[KEY]