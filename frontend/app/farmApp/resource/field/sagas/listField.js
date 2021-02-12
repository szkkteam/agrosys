import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { createRoutineSaga } from 'sagas'

import { listField } from '../actions'
// TODO: Import API
import { fields as fixture } from 'farmApp/fixtures'

import { selectFieldRequest } from '../reducers/fieldRequest'

export const KEY = 'listFieldSaga'


export const maybeListFieldSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectFieldRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listField.trigger())
    }
}

export const listFieldSaga = createRoutineSaga(
    listField,
    function *successGenerator() {
        // TODO: Call backend api
        // FIXME: Simulate network delay (250ms)
        yield delay(250)
        // TODO: Put result to redux-orm model
        yield put(listField.success({
            fields: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listField.MAYBE_TRIGGER, maybeListFieldSaga),
    takeLatest(listField.TRIGGER, listFieldSaga)
]