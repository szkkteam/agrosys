import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listProductions } from 'production/actions'
import ProductionApi from 'production/api'

import { selectProductions } from 'production/reducers/userTemplates'
import { selectSelectedFarm } from 'farm/reducers/farms'
import { normalizeProductions } from 'production/schemas'

export const KEY = 'productions'

export const maybeListProductionsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectProductions)
    if (!(isLoaded || isLoading)) {
        yield put(listProductions.trigger())
    }
}

export const listProductionsSaga = createRoutineSaga(
    listProductions,
    function *successGenerator() {
        // Get the selected farm from the store
        const selectedFarm = yield select(selectSelectedFarm)
        if (selectedFarm) {
            const productions = yield call(ProductionApi.listProductions, selectedFarm)
            yield put(listProductions.success({
                ...normalizeProductions(productions)
            }))            
        }
    }
)

export default() => [
    takeEvery(listProductions.MAYBE_TRIGGER, maybeListProductionsSaga),
    takeLatest(listProductions.TRIGGER, listProductionsSaga),
]