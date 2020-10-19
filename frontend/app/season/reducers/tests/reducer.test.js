import orm from 'entities/orm'
import seasonDetailReducer from '../seasonDetail'
import {
    selectSeason,
} from '../../actions'

describe('season reducer test', () => {

    describe('seasonDetail reducer', () => {

        it ('reducer initial state', () => {
            expect(seasonDetailReducer(undefined, {})
            ).toEqual({
                selectedSeason: null, 
            })
        })

        it ('simple select season', () => {
            const fixture = 1
            expect(seasonDetailReducer(undefined, selectSeason(fixture))
            ).toEqual({
                selectedSeason: fixture,
            })
        })

        it ('select, deselect season', () => {
            const fixture = 1
            expect(seasonDetailReducer({selectedSeason: fixture}, selectSeason(fixture))
            ).toEqual({
                selectedSeason: fixture,
            })
        })
    })
    
})