import { createFieldShape } from 'field/actions'

export const KEY = 'createFieldShape'


const initialState = {
    isDrawing: false,
    shape: null,
    area: 0.0,
}


export default function(state = initialState, action) {
    const { type, payload } = action
    const { shape, area } = payload || {shape: null, area: 0.0}

    switch(type) {
        case createFieldShape.DRAW_STARTED:
            return { ...state,
                isDrawing: true 
            }

        case createFieldShape.DRAW_DONE:
            return { ...state,
                shape: shape,
                area: area,
                isDrawing: false,
             }

        default:
            return state
    }
}


export const selectCreateFieldShape = (state) => state[KEY]
