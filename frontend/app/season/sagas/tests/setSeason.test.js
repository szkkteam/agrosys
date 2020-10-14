import { put } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { setSeasonSaga } from '../setSeason'
import { setSeason } from 'season/actions'
import reducer from 'season/reducers/seasonDetail'
//import { selectSelectedSeason } from 'season/reducers/seasonDetail'
//import { listSeasonParcel, actionParcel } from 'parcel/actions'

describe('setSeason saga', () => {
    let seasonSaga

    const payload = 1
    beforeEach(done => {
        const sagaMiddleware = createSagaMiddleware()
        const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware))

        seasonSaga = setSeasonSaga({ payload })

        // iterate past yield put(seasonSaga.request())
        const requestDescriptor = seasonSaga.next()
        //expect(requestDescriptor).toMatchSnapshot()

        done()
    })

    it('it should dispatch setSeason.success', () => {
        let putDescriptor = seasonSaga.next(payload).value.next().value
        expect(putDescriptor).toEqual(put(setSeason.success(payload)))
    })
})