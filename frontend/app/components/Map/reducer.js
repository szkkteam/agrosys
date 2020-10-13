import { 
    mapViewport,
    mapEvents,
    mapEdit,
 } from 'components/Map/actions'

export const KEY = 'map'


const initialState = {
    // Map events
    events: [],
    // Viewport
    viewPort: null,
    // Edit
    isEditing: false,
    editData: {}
}


export default function(state = initialState, action) {
    const { type, payload } = action
    const { initalValues: editData = null, eventRequest, viewPortChange } = payload || {}
    const { events } = state 

    switch(type) {

        case mapEdit.START:
            return { ...state,
                editData,
                isEditing: true,
            }

        case mapEdit.CANCEL:
        case mapEdit.SUBMIT:
            return { ...state,
                editData: {},
                isEditing: false,
            }

        case mapViewport.CHANGED:
            return { ...state,
                viewPort: viewPortChange,
            }

        case mapEvents.ADD:
            return { ...state,
                events: _.concat(events, eventRequest),
            }

        case mapEvents.CLEAR:
            return { ...state,
                events: [],
            }

        default:
            return state
    }
}


export const selectMap = (state) => state[KEY]
