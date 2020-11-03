import tutorialReducer from '../reducer'
import { tutorialProgressTypes } from '../constants'
import {
    markDone,
} from '../actions'

describe('tutorial reducer test', () => {

    describe('tutorial reducer', () => {

        it ('reducer initial state', () => {
            expect(tutorialReducer(undefined, {})
            ).toEqual({
                finishedTasks: {}, 
            })
        })

        it ('mark tutorial as done', () => {
            const fixture = 1
            expect(tutorialReducer(undefined, markDone(tutorialProgressTypes.CREATE_FARM))
            ).toEqual({
                finishedTasks: {
                    [tutorialProgressTypes.CREATE_FARM]: true,
                }
            })
        })

    })
    
})