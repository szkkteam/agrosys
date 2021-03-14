import orm from 'entities/orm'
import {
    getFarmList,
    getFarmListOld,
} from '../selectors.js'

describe('farm selectors', () => {

    let ormState
    let session
    let state

    beforeEach(done => {
        ormState = orm.getEmptyState()
        session = orm.mutableSession(ormState)

        state = {
            entities: ormState,            
        }

        done()
    })

    describe('getFarmListOld', () => {

        it('should return with objects', () => {
            const farmStatusFixtures = {
                isLoading: false
            }
            const expectedResult = {
                data: [],
                isLoading: false
            }
            const selected = getFarmListOld.resultFunc(session, farmStatusFixtures)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with model object', () => {
            const fixture = { id: 1, title: 'random title' }
            const farmStatusFixtures = {
                isLoading: false
            }
            const expectedResult = {
                data: [fixture],
                isLoading: false
            }
            const { Farm } = session
            Farm.parse(fixture)

            const selected = getFarmListOld.resultFunc(session, farmStatusFixtures)
            expect(selected).toEqual(expectedResult)
        })
    })

    describe('getFarmList', () => {

        it('should return with objects', () => {
            const farmStatusFixtures = {
                isLoading: false
            }
            const expectedResult = {
                data: [],
                isLoading: false
            }
            const selected = getFarmList.resultFunc(session, farmStatusFixtures)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with model object', () => {
            const fixture = { id: 1, title: 'random title' }
            const farmStatusFixtures = {
                isLoading: false
            }
            const expectedResult = {
                data: [fixture.id],
                isLoading: false
            }
            const { Farm } = session
            Farm.parse(fixture)

            const selected = getFarmList.resultFunc(session, farmStatusFixtures)
            expect(selected).toEqual(expectedResult)
        })
    })
})