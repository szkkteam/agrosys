import { TUTORIAL_MARK_DONE } from './constants'

export const markDone = (taskType) => ({
    type: TUTORIAL_MARK_DONE,
    payload: { taskType }
})


