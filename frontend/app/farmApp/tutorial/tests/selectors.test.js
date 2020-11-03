import {
    getTutorialPercentage,
} from '../selectors.js'

import {
    tutorialSteps
} from '../constants.js'

describe('tutorial selectors', () => {
 
    it('should return with 0 percent', () => {
        const fixture = {
            finishedTasks: {}
        }
        const expectedResult = 0
        const selected = getTutorialPercentage.resultFunc(fixture)
        expect(selected).toEqual(expectedResult)
    })

    it('should return with 100 percent', () => {
        let fixture = {
            finishedTasks: {
            }
        }
        Object.keys(tutorialSteps).forEach(key => Object.assign(fixture.finishedTasks, {[key]: true}))

        const expectedResult = 100
        const selected = getTutorialPercentage.resultFunc(fixture)
        expect(selected).toEqual(expectedResult)
    })

})