import { 
    mapEdit,
    mapViewport,
    mapEvents,
 } from 'map/actions'

export const KEY = 'map'


const initialState = {
    isDrawingStarted: false,
    isDrawingFinished: false,
    featureInEdit: null,
    // Map events
    events: []
}


export default function(state = initialState, action) {
    const { type, payload } = action
    const { featureInEdit, eventRequest } = payload || {}
    const { events } = state

    switch(type) {
        case mapEdit.DRAW_REQUESTED:
            return { ...state,
                isDrawingStarted: true,
                isDrawingFinished: false,
                featureInEdit: null,                
            }

        case mapEdit.DRAW_STARTED:
            return { ...state,

            }            

        case mapEdit.DRAW_FINISHED:
            return { ...state,
                isDrawingStarted: false,
                isDrawingFinished: true,
                featureInEdit: featureInEdit,
            }

        case mapEdit.FEATURE_MODIFIED:
            console.log("featureInEdit: ", featureInEdit)
            return { ...state,
                featureInEdit: featureInEdit,
            }

        case mapEdit.FEATURE_CLEAR:
            return { ...state,
                isDrawingStarted: false,
                isDrawingFinished: false,
                featureInEdit: null,
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
