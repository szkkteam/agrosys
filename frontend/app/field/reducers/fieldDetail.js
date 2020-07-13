import { loadFieldDetail } from 'field/actions'

export const KEY = 'fieldDetail'

const initialState = {
    isLoading: false,
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { field } = payload || []
    const { byId } = state

    switch(type) {
        case loadFieldDetail.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case loadFieldDetail.SUCCESS:
            byId[field.id] = field
            return { ...state,
                byId,
            }

        case loadFieldDetail.FULFILL:
            return { ...state, 
                isLoading: false, 
            }

        default:
            return state
    }
}

export const selectFieldDetail = (state) => state[KEY]
export const selectFieldDetailById = (state, id) => selectFieldDetail(state).byId[id]
