import { createSelector } from 'reselect'
import { selectTutorial } from './reducer'

import { tutorialSteps } from './constants'


export const getTutorialPercentage = createSelector(
    selectTutorial,
    state => {
        const done = Object.keys(state.finishedTasks).length
        const all = Object.keys(tutorialSteps).length
        return done/all*100 // Convert to percentage
    }
)

