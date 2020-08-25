import { 
    listParcelTypes
} from 'reference/actions'


export const KEY = 'parcelTypes'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { parcelTypes } = payload || {}
    const { byId } = state

    switch(type) {
        case listParcelTypes.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listParcelTypes.SUCCESS:
            return { ...state,
                ids: parcelTypes.map((parcelType) => parcelType.id),
                byId: parcelTypes.reduce((byId, parcelType) => {
                    byId[parcelType.id] = parcelType
                    return byId
                }, byId),
                isLoaded: true,  
            }

        case listParcelTypes.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listParcelTypes.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectParcelTypes = (state) => state[KEY]
export const selectParcelTypesList = (state) => {
    const parcels = selectParcelTypes(state)
    return parcels.ids.map((id) => parcels.byId[id])
}