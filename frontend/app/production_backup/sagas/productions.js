import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineSaga } from 'sagas'

import { listProductions } from 'production/actions'
import ProductionApi from 'production/api'
import { selectProductions } from 'production/reducers/productions'

export const KEY = 'productions'
 
export const maybeListProductionsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectProductions)
    if (!(isLoading || isLoaded)) {
        yield put(listProductions.trigger())
    }
}

export const listProductionsSaga = createRoutineSaga(
    listProductions,
    function *successGenerator(payload) {
        const productions = yield call(ProductionApi.listProductions)
        yield put(listProductions.success({
            productions: productions,
        }))
    },
)

export default () => [
    takeEvery(listProductions.MAYBE_TRIGGER, maybeListProductionsSaga),
    takeLatest(listProductions.TRIGGER, listProductionsSaga)
]