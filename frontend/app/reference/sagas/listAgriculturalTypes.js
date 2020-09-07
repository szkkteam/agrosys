import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listAgriculturalTypes } from 'reference/actions'
import AgriculturalApi from 'reference/api'
import { selectAgriculturalTypes } from 'reference/reducers/agriculturalTypes'
import { normalizeAgriculturalTypes } from 'reference/schemas'

export const KEY = 'agriculturalType'

export const maybeListAgriculturalTypesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectAgriculturalTypes)
    if (!(isLoaded || isLoading)) {
        yield put(listAgriculturalTypes.trigger())
    }
}

export const listAgriculturalTypesSaga = createRoutineSaga(
    listAgriculturalTypes,
    function *successGenerator() {
        const agriculturalTypes = yield call(AgriculturalApi.listAgriculturalTypes)
        yield put(listAgriculturalTypes.success({
            ...normalizeAgriculturalTypes(agriculturalTypes)
        }))
    }
)

export default() => [
    takeEvery(listAgriculturalTypes.MAYBE_TRIGGER, maybeListAgriculturalTypesSaga),
    takeLatest(listAgriculturalTypes.TRIGGER, listAgriculturalTypesSaga),
]