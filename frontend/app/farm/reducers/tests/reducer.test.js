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
        /*
    describe('farms reducer', () => {
        const state = orm.getEmptyState()

        it ('reducer initial state', () => {
            expect(farmsReducer(undefined, {})
            ).toEqual({})
        })

        it ('listFarms action', () => {
            const fixture = [
                {
                    id: 1,
                    title: 'First farm',
                },
                {
                    id: 2,
                    title: 'Second farm',
                }
            ]
            expect(farmsReducer(state, listFarms.success({farms: fixture}))
            ).toEqual(expect.anything())
        })

    })
    */
})