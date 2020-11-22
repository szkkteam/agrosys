import { TUTORIAL_MARK_DONE, tutorialSteps } from './constants'

export const KEY = 'tutorialProgress'

const initialState = {    
    finishedTasks: {},
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { taskType } = payload || {}
    const { finishedTasks } = state

    switch(type) {

        case TUTORIAL_MARK_DONE:
            let newTaskHolder = {...finishedTasks} 
            if (taskType in tutorialSteps) {
                Object.assign(newTaskHolder, { [taskType]: true })
            }
            return { ...state,
                finishedTasks : newTaskHolder,
            }

        default:
            return state
    }
}

export const selectTutorial = (state) => state[KEY]
