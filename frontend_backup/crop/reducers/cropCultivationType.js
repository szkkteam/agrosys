import { 
    listCropCultivationTypes,
} from 'crop/actions'

export const KEY = 'cropCultivationType'

const initialState = {
    isLoading: false,
    isLoaded: false,
    cropCultivationTypes: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { cropCultivationTypes } = payload || []
    
    switch(type) {
        case listCropCultivationTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listCropCultivationTypes.SUCCESS:
            return { ...state,
                cropCultivationTypes: cropCultivationTypes,
                isLoaded: true,
             }
        
        case listCropCultivationTypes.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listCropCultivationTypes.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectCropCultivationTypes = (state) => state[KEY]
export const selectCropCultivationTypesList = (state) => {
    const crop = selectCropCultivationTypes(state)
    return crop.cropCultivationTypes
}