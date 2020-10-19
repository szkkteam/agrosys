import { 
    listSeasonParcel,   
    createParcel,
    updateParcel,
} from 'parcel/actions'


export const KEY = 'parcelStatus'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case listSeasonParcel.REQUEST:
        case createParcel.REQUEST:
        case updateParcel.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listSeasonParcel.SUCCESS:
        case createParcel.SUCCESS:
        case updateParcel.SUCCESS:
            return { ...state,
                isLoaded: true,  
            }

        case listSeasonParcel.FAILURE:
        case createParcel.FAILURE:
        case updateParcel.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasonParcel.FULFILL:
        case createParcel.FULFILL:
        case updateParcel.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectParcelStatus = (state) => state[KEY]