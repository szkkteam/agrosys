import { 
    listSpecificProducts
} from 'reference/actions'

export const KEY = 'specificProducts'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { specificProducts: specificProductsById, ids } = payload || {}
    const { byId } = state
    switch(type) {
        case listSpecificProducts.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSpecificProducts.SUCCESS:
            return { ...state,
                byId: {...byId, ...specificProductsById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
            }

        case listSpecificProducts.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSpecificProducts.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectSpecificProducts = (state) => state[KEY]
export const selectSpecificProductIds = (state) => selectSpecificProducts(state).ids
export const selectSpecificProductsbyId = (state) => selectSpecificProducts(state).byId
