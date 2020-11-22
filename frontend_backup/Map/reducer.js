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
    editData: null
}


export default function(state = initialState, action) {
    const { type, payload } = action
    const { initialValues: editData = null, eventRequest, viewPortChange } = payload || {}
    const { events } = state 

    switch(type) {

        case mapEdit.ADD:
            return { ...state,
                editData,
                isEditing: false,
            }

        case mapEdit.EDIT:
            return { ...state,
                editData,
                isEditing: true,
            }

        case mapEdit.CANCEL:
        case mapEdit.SUBMIT:
            return { ...state,
                editData: null,
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
