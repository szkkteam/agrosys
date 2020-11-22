import { SHOW_CREATE_MODAL } from '../actions'

export const KEY = 'createBlockModalReducer'

const initialState = {    
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {

        default:
            return state
    }
}
