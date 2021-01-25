import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listCropType } from '../actions'
// TODO: Import API

import { selectCropTypesRequest } from '../reducers/cropTypesRequest'

export const KEY = 'listCropTypes'

export const fixture = [
    {id: 1, title: "Téli búza"},
]

export const maybeListCropTypesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectCropTypesRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listCropTypesSaga.trigger())
    }
}

export const listCropTypesSaga = createRoutineSaga(
    listCropType,
    function *successGenerator() {
        // TODO: Call backend api
        // TODO: Put result to redux-orm model
        yield put(listCropType.success({
            cropTypes: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listCropType.MAYBE_TRIGGER, maybeListCropTypesSaga),
    takeLatest(listCropType.TRIGGER, listCropTypesSaga)
]