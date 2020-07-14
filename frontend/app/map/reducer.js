import { 
    mapEdit,
    mapViewport,
    mapEvents,
 } from 'map/actions'

export const KEY = 'map'


const initialState = {
    isDrawingStarted: false,
    isDrawingFinished: false,
    featureInEdit: {},
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

        case mapEdit.DRAW_STARTED:
            return { ...state,
                isDrawingStarted: true,
            }            
        
        case mapViewport.CHANGED:
            return { ...state,
                viewPort: viewPortChange,
            }

        case mapEdit.DRAW_FINISHED:
            return { ...state,
                isDrawingStarted: false,
                isDrawingFinished: true,
                featureInEdit: featureInEdit,
            }

        case mapEdit.FEATURE_MODIFIED:
            return { ...state,
                featureInEdit: featureInEdit,
            }

        case mapEdit.CLEAR:
            return { ...state,
                isDrawingStarted: false,
                isDrawingFinished: false,
                featureInEdit: {},
            }

        case mapEvents.ADD_EVENT:
            events.push(eventRequest)
            return { ...state,
                events: events,
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
export const selectMapFeautreInEdit = (state) => {
    const map = selectMap(state)
    return map.featureInEdit
}
