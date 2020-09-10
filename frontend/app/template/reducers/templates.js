import { 
    listTemplates,
} from 'template/actions'
/*
import {
    deNormalizeSeasons,
} from 'season/schemas'
*/
import { storage } from 'utils'

export const KEY = 'templates'

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
        case listTemplates.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listTemplates.SUCCESS:
            return { ...state,
                byId: {...byId, ...templatesById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
            }

        case listTemplates.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listTemplates.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectTemplates = (state) => state[KEY]
export const selectTemplatesEntities = (state) => {
    const templates = selectSeasons(state)
    return { templates: templates.byId,  }
}
