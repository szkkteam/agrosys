import orm from 'entities/orm'
import {
    getSeasonList,
} from '../selectors.js'

describe('season selectors', () => {

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

    describe('getSeasonList', () => {

        it('should return with objects', () => {
            const statusFixtures = {
                isLoading: false
            }
            const selectedFarm = 1
            const expectedResult = {
                data: [],
                isLoading: false
            }
            const selected = getSeasonList.resultFunc(session, statusFixtures, selectedFarm)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with model object', () => {
            const seasons1 = [
                {id: 1, title: 'Season 1', dates: { endDate: "2020-12-31T00:00:00+00:00", startDate: "2020-01-31T00:00:00+00:00"}},
                {id: 2, title: 'Season 2', dates: { endDate: "2019-12-31T00:00:00+00:00", startDate: "2019-01-31T00:00:00+00:00"}}]
            const seasons2 = [{id: 3, title: 'Season 2', dates: { endDate: "2020-12-31T00:00:00+00:00", startDate: "2020-01-31T00:00:00+00:00"}}]
            const farmFixture = [{ id: 1, title: 'random title', seasons: seasons1 }, {id: 2, title: 'farm 2', seasons: seasons2}]
            const statusFixtures = {
                isLoading: false
            }
            const selectedFarm = 1
            const expectedResult = {
                data: [2, 1],
                isLoading: false
            }
            const { Farm } = session
            farmFixture.forEach(farm => Farm.parse(farm))

            const selected = getSeasonList.resultFunc(session, statusFixtures, selectedFarm)
            expect(selected).toEqual(expectedResult)
        })
    })

})