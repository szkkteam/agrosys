import { PARCEL_SELECT } from 'parcel/constants'

export const KEY = 'parcelDetail'

const initialState = {    
    selectedParcel: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { currentParcel } = payload || {}

    switch(type) {

        case PARCEL_SELECT:
            const newSelection = state.selectedParcel == currentParcel? null : currentParcel
            return { ...state,
                selectedParcel : newSelection,
            }

        default:
            return state
    }
}

export const selectParcelDetail = (state) => state[KEY]
