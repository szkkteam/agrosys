import { 
    listCropTemplates,
} from 'crop/actions'

export const KEY = 'cropBase'

const initialState = {
    isLoading: false,
    isLoaded: false,
    cropTemplates: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { cropTemplates } = payload || []
    
    switch(type) {
        case listCropTemplates.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listCropTemplates.SUCCESS:
            return { ...state,
                cropTemplates: cropTemplates,
                isLoaded: true,
             }
        
        case listCropTemplates.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listCropTemplates.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectCropTemplates = (state) => state[KEY]
export const selectCropTemplatesList = (state) => {
    const crop = selectCropTemplates(state)
    return crop.cropTemplates
}