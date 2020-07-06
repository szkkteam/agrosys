import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listFarms } from 'farm/actions'
import FarmApi from 'farm/api'
import { selectFarms } from 'farm/reducers/farms'

export const KEY = 'farms'

export const maybeListFarmsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectFarms)
    if (!(isLoaded || isLoading)) {
        yield put(listFarms.trigger())
    }
}

export const listFarmsSaga = createRoutineSaga(
    listFarms,
    function *successGenerator() {
        const farms = yield call(FarmApi.listFarms)
        yield put(listFarms.success({
            farms
        }))
    }
)

export default() => [
    takeEvery(listFarms.MAYBE_TRIGGER, maybeListFarmsSaga),
    takeLatest(listFarms.TRIGGER, listFarmsSaga),
]