import { loadProductionDetail, productionTemplate } from 'production/actions'

export const KEY = 'productionDetail'

const initialState = {
    isLoading: false,
    byId: {},
    error: null,
    selectedTemplate: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { production } = payload || []
    const { byId } = state

    switch(type) {
        case loadProductionDetail.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case loadProductionDetail.SUCCESS:
            byId[production.id] = production
            return { ...state,
                selectedTemplate: production,
                byId,
            }

        case loadProductionDetail.FULFILL:
            return { ...state, 
                isLoading: false, 
            }

        case loadProductionDetail.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case productionTemplate.CLEAR:
            return { ...state, 
                selectedTemplate: null,
            }

        default:
            return state
    }
}

export const selectProductionDetail = (state) => state[KEY]
export const selectProductionDetailById = (state, id) => selectProductionDetail(state).byId[id]
export const selectProductionTemplate = (state, id) => selectProductionDetail(state).selectedTemplate
