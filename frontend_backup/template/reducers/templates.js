import { 
    actionTemplate,
} from 'template/actions'

import { createTemplateEnums } from 'template/constants'

import { storage } from 'utils'

export const KEY = 'templates'

const initialState = {    
    templateState: createTemplateEnums.IDLE,
    selectedTemplateId: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        
        case actionTemplate.SELECT_TEMPLATE:
            const { selectedTemplateId } = payload
            // If selection is the same, perform deselect logic
            console.log("state.selectedTemplateId: ", state.selectedTemplateId)
            console.log("selectedTemplateId: ", selectedTemplateId)

            const selectNewSelection = state.selectedTemplateId != selectedTemplateId? selectedTemplateId: null

            return { ...state,
                selectedTemplateId: selectNewSelection,
                templateState: selectNewSelection? createTemplateEnums.SELECTION : createTemplateEnums.IDLE,
            }
        
        case actionTemplate.SELECT_STATE:
            const { templateState } = payload || createTemplateEnums.IDLE 
            const newSelection = (templateState === createTemplateEnums.CREATE_FROM_SCRATCH || createTemplateEnums.CREATE_FROM_TEMPLATE) ? null : state.selectedTemplateId
            return {
                ...state,
                selectedTemplateId: newSelection, 
                templateState,
            }

        default:
            return state
    }
}

export const selectTemplates = (state) => state[KEY]
export const selectTemplateState = (state) => state[KEY].templateState
export const selectSelectedTemplateId = (state) => state[KEY].selectedTemplateId
