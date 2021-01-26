import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { createRoutineSaga } from 'sagas'

import { listCropType } from '../actions'
// TODO: Import API

import { selectCropTypeRequest } from '../reducers/cropTypeRequest'

export const KEY = 'listCropType'

export const fixture = [
    {id: 1, title: "Téli búza", category: "Takarmány növény"},
    {id: 2, title: "Tavaszi búza", category: "Takarmány növény"},
    {id: 3, title: "Kukorica", category: "Takarmány növény"},
    {id: 4, title: "Repce", category: "Takarmány növény"},
]

export const maybeListCropTypeSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectCropTypeRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listCropType.trigger())
    }
}

export const listCropTypeSaga = createRoutineSaga(
    listCropType,
    function *successGenerator() {
        // TODO: Call backend api
        // FIXME: Simulate network delay (250ms)
        yield delay(250)
        // TODO: Put result to redux-orm model
        yield put(listCropType.success({
            cropTypes: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listCropType.MAYBE_TRIGGER, maybeListCropTypeSaga),
    takeLatest(listCropType.TRIGGER, listCropTypeSaga)
]