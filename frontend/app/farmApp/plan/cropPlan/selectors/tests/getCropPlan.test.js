import schema from 'farmApp/schema'
import selector from '../getCropPlan'
    

describe('getCropPlan selector', () => {
    const requestFixtures = {
        isLoading: false,
        error: null,
    }

    let ormState
    let session
    let state

    beforeEach(done => {
        ormState = schema.getEmptyState()
        session = schema.mutableSession(ormState)

        state = {
            entities: ormState,            
        }

        done()
    })

    it('should return with empty objects', () => {
      
        const expectedResult = {
            payload: null,
            isLoading: false,
            error: null
        }
        const fnc = selector()
        const selected = fnc.resultFunc(session, requestFixtures, 1)
        expect(selected).toEqual(expectedResult)
    })

    it('should return with nested object', () => {
        const fixture = [
            {id: 1, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}},
            {id: 2, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}},
        ]

        const expectedResult = {
            payload: {id: 1, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}},
            isLoading: false,
            error: null
        }
        const { CropPlan } = session
        fixture.forEach(x => CropPlan.parse(x))

        const fnc = selector()
        const selected = fnc.resultFunc(session, requestFixtures, 1)
        expect(selected).toEqual(expectedResult)
    })
})