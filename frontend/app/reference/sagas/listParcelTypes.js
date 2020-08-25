import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listParcelTypes } from 'reference/actions'
import ParcelApi from 'reference/api'
import { selectParcelTypes } from 'reference/reducers/parcelTypes'

export const KEY = 'soilType'

export const maybeListParcelTypesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectSoilsTypes)
    if (!(isLoaded || isLoading)) {
        yield put(listParcelTypes.trigger())
    }
}

export const listParcelTypesSaga = createRoutineSaga(
    listParcelTypes,
    function *successGenerator() {
        const parcelTypes = yield call(ParcelApi.listParcelTypes)
        yield put(listParcelTypes.success({
            parcelTypes
        }))
    }
)

export default() => [
    takeEvery(listParcelTypes.MAYBE_TRIGGER, maybeListParcelTypesSaga),
    takeLatest(listParcelTypes.TRIGGER, listParcelTypesSaga),
]