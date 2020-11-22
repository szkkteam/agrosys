import orm from 'entities/orm'
import farmDetailReducer from '../farmDetail'
import farmsReducer from '../farms'
import farmDetailStatus from '../farmStatus'
import {
    listFarms,
    selectFarm,
} from '../../actions'

describe('farm reducer test', () => {

    describe('farmDetail reducer', () => {

        it ('reducer initial state', () => {
            expect(farmDetailReducer(undefined, {})
            ).toEqual({
                    selectedFarm: null, 
            })
        })

        it ('simple select farm', () => {
            const fixture = 1
            expect(farmDetailReducer(undefined, selectFarm(fixture))
            ).toEqual({
                selectedFarm: fixture,
            })
        })

        it ('select, deselect farm', () => {
            const fixture = 1
            expect(farmDetailReducer({selectedFarm: fixture}, selectFarm(fixture))
            ).toEqual({
                selectedFarm: fixture,
            })
        })
    })
    
})