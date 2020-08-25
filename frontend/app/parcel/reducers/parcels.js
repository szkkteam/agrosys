import { 
    listSeasonParcel,   
} from 'parcel/actions'

export const KEY = 'parcels'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: [],
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { seasons } = payload || {}
    const { byId } = state

    switch(type) {
        case listSeasonParcel.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSeasonParcel.SUCCESS:
            return { ...state,
                ids: seasons.map((season) => season.id),
                byId: seasons.reduce((byId, season) => {
                    byId[season.id] = season
                    return byId
                }, byId),
                isLoaded: true,  
            }

        case listSeasonParcel.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasonParcel.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectParcels = (state) => state[KEY]
export const selectParcelsListById = (state, idList = []) => {
    const parcels = selectParcels(state)
    return idList.map((id) => parcels.byId[id])
}