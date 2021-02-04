import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { createRoutineSaga } from 'sagas'

import { listUserCrop } from '../actions'
// TODO: Import API

import { selectUserCropRequest } from '../reducers/userCropRequest'

export const KEY = 'listUserCropSaga'

export const fixture = [
    {id: 1, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
]

export const maybeListUserCropSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectUserCropRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listUserCrop.trigger())
    }
}

export const listUserCropSaga = createRoutineSaga(
    listUserCrop,
    function *successGenerator() {
        // TODO: Call backend api
        // FIXME: Simulate network delay (250ms)
        yield delay(250)
        // TODO: Put result to redux-orm model
        yield put(listUserCrop.success({
            userCrops: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listUserCrop.MAYBE_TRIGGER, maybeListUserCropSaga),
    takeLatest(listUserCrop.TRIGGER, listUserCropSaga)
]