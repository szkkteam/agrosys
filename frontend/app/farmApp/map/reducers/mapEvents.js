import { 
    MAP_VIEWPORT_CHANGED,
    MAP_EVENT_ADD,
    MAP_EVENT_CLEAR
} from '../actions'

export const KEY = 'mapEvents'

const initialState = {
    // Map events
    events: [],
    // Viewport
    viewPort: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    const { bounds, event } = payload || {}
    const { events } = state 

    switch(type) {

        case MAP_VIEWPORT_CHANGED:
            return { ...state,
                viewPort: bounds,
            }

        case MAP_EVENT_ADD:
            return { ...state,
                events: _.concat(events, event),
            }

        case MAP_EVENT_CLEAR:
            return { ...state,
                events: [],
            }
        
        default:
            return state
    }
}

export const selectMapEvents = (state) => state[KEY]