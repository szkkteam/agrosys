import { 
    listCropVariants,
} from 'crop/actions'

export const KEY = 'cropVariant'

const initialState = {
    isLoading: false,
    isLoaded: false,
    cropVariants: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { cropVariants } = payload || []
    
    switch(type) {
        case listCropVariants.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listCropVariants.SUCCESS:
            return { ...state,
                cropVariants: cropVariants,
                isLoaded: true,
             }
        
        case listCropVariants.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listCropVariants.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectCropVariants = (state) => state[KEY]
export const selectCropVariantsList = (state) => {
    const crop = selectCropVariants(state)
    return crop.cropVariants
}