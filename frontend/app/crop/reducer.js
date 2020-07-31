/*
import { 
    listCropBases,
    listCropVariants,
    listCropCultivationTypes,
    listCropTemplates,
} from 'crop/actions'

export const KEY = 'crop'

const initialState = {
    isLoading: {
        cropBase: false,
        cropVariant: false,
        cropCultivationType: false,
        cropTemplates: false,
    },
    isLoaded: {
        cropBase: false,
        cropVariant: false,
        cropCultivationType: false,
        cropTemplates: false,
    },

    soilTypes: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { soilTypes } = payload || {}
    
    switch(type) {
        case listCropBases.REQUEST:
            return { ...state,
                isLoading: {
                    ...state.isLoading,
                    cropBase: true,
                },
            }

        case listCropVariants.REQUEST:
            return { ...state,
                isLoading: {
                    ...state.isLoading,
                    cropVariant: true,
                },
            }

        case listCropCultivationTypes.REQUEST:
            return { ...state,
                isLoading: {
                    ...state.isLoading,
                    cropCultivationType: true,
                },
            }

        case listCropTemplates.REQUEST:
            return { ...state,
                isLoading: {
                    ...state.isLoading,
                    cropTemplates: true,
                },
            }

        case listCropBases.SUCCESS:
            return { ...state,
                isLoaded: {
                    ...state.isLoaded,
                    cropBase: true,
                },
            }

        case listSoilTypes.SUCCESS:
            return { ...state,
                soilTypes: soilTypes,
                isLoaded: true,
             }
        
        case listSoilTypes.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSoilTypes.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectSoilTypes = (state) => state[KEY]
export const selectSoilTypesList = (state) => {
    const soils = selectSoilTypes(state)
    return soils.soilTypes
}
*/