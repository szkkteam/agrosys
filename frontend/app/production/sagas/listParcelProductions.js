import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listParcelProductions } from 'production/actions'
import ProductionApi from 'production/api'

import { getSelectedParcel } from 'parcel/selectors'
import { normalizeProductions } from 'production/schemas'

export const KEY = 'parcelProductions'

export const listParcelProductionsSaga = createRoutineSaga(
    listParcelProductions,
    function *successGenerator() {
        // Get the selected farm from the store
        const selectedParcel = yield select(getSelectedParcel)
        if (selectedParcel) {
            const productions = yield call(ProductionApi.listParcelProductions, selectedParcel)
            yield put(listParcelProductions.success({
                ...normalizeProductions(productions)
            }))            
        }
    }
)

export default() => [
    takeLatest(listParcelProductions.TRIGGER, listParcelProductionsSaga),
]