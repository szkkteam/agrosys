import { createFields, listFields } from 'field/actions'

export const KEY = 'fields'

const initialState = {
    // listFields
    isLoading: false,
    isLoaded: false,
    fields: [],
    ids: [],
    displayShapesById: {},
    // createFields
    selectedField: null,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { fields } = payload || []
    const { displayShapesById } = state

    switch(type) {
        case listFields.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listFields.SUCCESS:
            return { ...state,
                isLoaded: true,
                fields: fields,
                displayShapesById: fields.reduce((displayShapesById, field) => {
                    displayShapesById[field.id] = field.fields[field.fields.length - 1].shape
                    return displayShapesById
                }, displayShapesById),
                ids: fields.map((field) => field.id)
            }

        case createFields.SUCCESS:
            return { ...state,
                isLoaded: false,
                selectedField: payload,
             }
        
        case listFields.FAILURE:
        case createFields.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listFields.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectFields = (state) => state[KEY]
export const selectFieldsList = (state) => {
    const fields = selectFields(state)
    return fields.fields
}
export const selectFieldsShapeList = (state) => {
    const fields = selectFields(state)
    //return fields.ids.map((id) => fields.displayShapesById[id])
    return fields.displayShapesById
  }