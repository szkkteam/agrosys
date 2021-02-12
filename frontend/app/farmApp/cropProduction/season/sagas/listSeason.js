import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { createRoutineSaga } from 'sagas'

import { listSeason } from '../actions'
// TODO: Import API
import { seasons as fixture } from 'farmApp/fixtures'

import { selectSeasonRequest } from '../reducers/seasonRequest'

export const KEY = 'listSeasonSaga'

export const maybeListSeasonSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectSeasonRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listSeason.trigger())
    }
}

export const listSeasonSaga = createRoutineSaga(
    listSeason,
    function *successGenerator() {
        // TODO: Call backend api
        // FIXME: Simulate network delay (250ms)
        yield delay(250)
        // TODO: Put result to redux-orm model
        yield put(listSeason.success({
            seasons: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listSeason.MAYBE_TRIGGER, maybeListSeasonSaga),
    takeLatest(listSeason.TRIGGER, listSeasonSaga)
]