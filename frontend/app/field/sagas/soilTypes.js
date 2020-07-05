import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listSoilTypes } from 'field/actions'
import SoilTypeApi from 'field/api'
import { selectSoilTypes } from 'field/reducers/soilTypes'

export const KEY = 'soilType'

export const maybeListSoilTypesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectSoilTypes)
    if (!(isLoaded || isLoading)) {
        yield put(listSoilTypes.trigger())
    }
}

export const listSoilTypesSaga = createRoutineSaga(
    listSoilTypes,
    function *successGenerator() {
        const soilTypes = yield call(SoilTypeApi.listSoilTypes)
        yield put(listSoilTypes.success({
            soilTypes
        }))
    }
)

export default() => [
    takeEvery(listSoilTypes.MAYBE_TRIGGER, maybeListSoilTypesSaga),
    takeLatest(listSoilTypes.TRIGGER, listSoilTypesSaga),
]