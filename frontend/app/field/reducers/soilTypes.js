import { listSoilTypes } from 'field/actions'

export const KEY = 'soilTypes'

const initialState = {
    isLoading: false,
    isLoaded: false,
    titles: [],
    byTitle: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { soilTypes } = payload || {}
    const { byTitle } = state

    switch(type) {
        case listSoilTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSoilTypes.SUCCESS:
            return { ...state,
                titles: soilTypes.map((soilType) => soilType.title),
                byTitle: soilTypes.reduce((byTitle, soilType) => {
                    byTitle[soilType.title] = soilType
                    return byTitle
                }, byTitle),
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
    const soilTypes = selectSoilTypes(state)
    return soilTypes.titles.map((title) => soilTypes.byTitle[title])
}