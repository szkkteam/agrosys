import { put } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { selectSeasonSaga } from '../selectSeason'
import { selectSeason } from 'season/actions'
import { listSeasonParcel, actionParcel } from 'parcel/actions'
import reducer from 'season/reducers/seasonDetail'
//import { selectSelectedSeason } from 'season/reducers/seasonDetail'
//import { listSeasonParcel, actionParcel } from 'parcel/actions'

describe('selectSeasonSaga saga', () => {
    let seasonSaga

    const payload = 1
    beforeEach(done => {
        const sagaMiddleware = createSagaMiddleware()
        const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware))

        seasonSaga = selectSeasonSaga(payload)

        done()
    })

    it('it should dispatch selectSeason', () => {
        let putDescriptor = seasonSaga.next().value
        expect(putDescriptor).toEqual(put(listSeasonParcel.trigger()))

        putDescriptor = seasonSaga.next().value
        expect(putDescriptor).toEqual(put(actionParcel.selectParcel(null)))
    })
})
