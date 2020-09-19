import { 
    mapViewport,
    mapEvents,
 } from 'components/Map/actions'

export const KEY = 'map'


const initialState = {
    // Map events
    events: [],
    // Viewport
    viewPort: null,
}


export default function(state = initialState, action) {
    const { type, payload } = action
    const { featureInEdit, eventRequest, viewPortChange } = payload || {}
    const { events } = state

    switch(type) {

        case mapViewport.CHANGED:
            return { ...state,
                viewPort: viewPortChange,
            }

        case mapEvents.ADD_EVENT:
            return { ...state,
                events: _.concat(events, eventRequest),
            }

        case mapEvents.CLEAR_EVENTS:
            return { ...state,
                events: [],
            }

        default:
            return state
    }
}


export const selectMap = (state) => state[KEY]
