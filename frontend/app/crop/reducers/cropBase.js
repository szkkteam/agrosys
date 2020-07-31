import { 
    listCropBases,
} from 'crop/actions'

export const KEY = 'cropBase'

const initialState = {
    isLoading: false,
    isLoaded: false,
    cropBases: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { cropBases } = payload || []
    
    switch(type) {
        case listCropBases.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listCropBases.SUCCESS:
            return { ...state,
                cropBases: cropBases,
                isLoaded: true,
             }
        
        case listCropBases.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listCropBases.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectCropBases = (state) => state[KEY]
export const selectCropBasesList = (state) => {
    const crop = selectCropBases(state)
    return crop.cropBase
}