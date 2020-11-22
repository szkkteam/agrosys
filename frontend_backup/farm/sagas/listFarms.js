import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listFarms, selectFarm } from 'farm/actions'
import FarmApi from 'farm/api'
import { selectFarmStatus } from 'farm/reducers/farmStatus'
import { selectCurrentFarm } from 'farm/selectors'


export const KEY = 'listFarms'

export const maybeListFarmsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectFarmStatus)
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
        const currentFarm = yield select(selectCurrentFarm)
        if (!currentFarm) {
            yield put(selectFarm(_.last(farms).id))
        }
        
    }
)

export default() => [
    takeEvery(listFarms.MAYBE_TRIGGER, maybeListFarmsSaga),
    takeLatest(listFarms.TRIGGER, listFarmsSaga),
]