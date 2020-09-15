import { 
    listTemplates,
    createTemplate,
} from 'template/actions'

export const KEY = 'tasks'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { tasks: tasksById, ids } = payload || {}
    const { byId } = state

    switch(type) {
        
        case createTemplate.SUCCESS:
        case listTemplates.SUCCESS:
            return { ...state,
                byId: {...byId, ...tasksById},
                //ids: _.uniq(_.concat(state.ids, ids)), Cannot store IDs here, because we are listening to the templates action
                //isLoaded: true,  
            }


        default:
            return state
    }
}

export const selectTasks = (state) => state[KEY]
export const selectTasksEntities = (state) => {
    const templates = selectTasks(state)
    return { templates: templates.byId,  }
}
