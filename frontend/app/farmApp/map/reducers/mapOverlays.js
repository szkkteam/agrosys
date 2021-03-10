import { 
    MAP_OVERLAY_TOOLTIP_SHOW,
    MAP_OVERLAY_TOOLTIP_HIDE
} from '../actions'

export const KEY = 'mapOverlays'

const initialState = {
    tooltipShow: true,
    
}

export default function(state = initialState, action) {
    const { type, payload } = action

    //const {  } = payload || {}
    const { events } = state 

    switch(type) {

        case MAP_OVERLAY_TOOLTIP_SHOW:
            return { ...state,
                tooltipShow: true,
            }

        case MAP_OVERLAY_TOOLTIP_HIDE:
            return { ...state,
                tooltipShow: hide,
            }
        
        default:
            return state
    }
}

export const selectMapOverlays = (state) => state[KEY]