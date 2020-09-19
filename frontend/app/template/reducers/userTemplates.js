import { 
    listUserTemplates,
    createTemplate,
    actionTemplate,
} from 'template/actions'
/*
import {
    deNormalizeSeasons,
} from 'season/schemas'
*/
import { storage } from 'utils'

export const KEY = 'userTemplates'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { templates: templatesById, ids } = payload || {}
    const { byId } = state

    switch(type) {
        case listUserTemplates.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case createTemplate.SUCCESS:
        case listUserTemplates.SUCCESS:
            console.log("Tempaltes-createTemplate.SUCCESS: ", templatesById)
            return { ...state,
                byId: {...byId, ...templatesById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
            }

        case listUserTemplates.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listUserTemplates.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectUserTemplates = (state) => state[KEY]
export const selectUserTemplateIds = (state) => state[KEY].ids
export const selectUserTemplatesById = (state) => state[KEY].byId
export const selectUserTemplatesEntities = (state) => {
    const templates = selectUserTemplates(state)
    return { templates: templates.byId,  }
}
