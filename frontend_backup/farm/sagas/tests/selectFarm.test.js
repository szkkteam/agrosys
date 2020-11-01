import { put } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { selectFarmSaga } from '../selectFarm'
import { selectFarm } from 'farm/actions'
import { listSeasons } from 'season/actions'
import reducer from 'farm/reducers/farmDetail'
//import { selectSelectedSeason } from 'season/reducers/seasonDetail'
//import { listSeasonParcel, actionParcel } from 'parcel/actions'

describe('selectFarmSaga saga', () => {
    let farmSaga

    const payload = 1
    beforeEach(done => {
        const sagaMiddleware = createSagaMiddleware()
        const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware))

        farmSaga = selectFarmSaga(payload)

        done()
    })

    it('it should dispatch selectFarm', () => {
        let putDescriptor = farmSaga.next().value
        expect(putDescriptor).toEqual(put(listSeasons.trigger()))
    })
})
