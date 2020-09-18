import { 
    listDefaultTemplates,
} from 'template/actions'
/*
import {
    deNormalizeSeasons,
} from 'season/schemas'
*/
import { storage } from 'utils'

export const KEY = 'defaultTemplates'

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
        case listDefaultTemplates.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listDefaultTemplates.SUCCESS:
            console.log("Tempaltes-createTemplate.SUCCESS: ", templatesById)
            return { ...state,
                byId: {...byId, ...templatesById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
            }

        case listDefaultTemplates.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listDefaultTemplates.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectDefaultTemplates = (state) => state[KEY]
export const selectDefaultTemplateIds = (state) => state[KEY].ids
export const selectDefaultTemplatesById = (state) => state[KEY].byId
export const selectDefaultTemplatesEntities = (state) => {
    const templates = selectDefaultTemplates(state)
    return { templates: templates.byId,  }
}
