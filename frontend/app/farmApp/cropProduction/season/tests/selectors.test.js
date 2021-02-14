import schema from 'farmApp/schema'

import {
    getSeasonById,
} from '../selectors.js'

export const fixtures = [
    {id: 1, title: 'Búza 2020', },
    {id: 2, title: 'Búza 2021', },
    {id: 3, title: 'Búza 2022', }
]
    

describe('season selectors', () => {
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
   
    describe('getSeasonById', () => {

        it('should return with null object', () => {

            const expectedResult = {
                payload: null,
                isLoading: false,
                error: null
            }
            const fnc = getSeasonById()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model instance', () => {
            const expectedFixture = fixtures[0]

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { Season } = session
            fixtures.forEach(x => Season.parse(x))

            const fnc = getSeasonById()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
    })

})
