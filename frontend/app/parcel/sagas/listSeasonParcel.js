import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listSeasonParcel } from 'parcel/actions'
import ParcelApi from 'parcel/api'
import { selectParcels } from 'parcel/reducers/parcels'
import { selectSelectedSeasons } from 'season/reducers/seasons'
import { normalizeParcels } from 'parcel/schemas'

export const KEY = 'listSeasonParcel'

export const maybeListSeasonParcelSaga = function *(payload) {
    const { isLoading, isLoaded } = yield select(selectParcels)
    if (!(isLoaded || isLoading)) {
        yield put(listSeasonParcel.trigger(payload))
    }
}

export const listSeasonParcelSaga = createRoutineSaga(
    listSeasonParcel,
    function *successGenerator(payload = null) {
        // Get the selected farm from the store
        const { selectedSeason = yield select(selectSelectedSeasons)  } = payload || {}
        if (selectedSeason) {
            const parcels = yield call(ParcelApi.listSeasonParcels, selectedSeason)
            yield put(listSeasonParcel.success({
                ...normalizeParcels(parcels)
            }))
        }
    }
)

export default() => [
    takeEvery(listSeasonParcel.MAYBE_TRIGGER, maybeListSeasonParcelSaga),
    takeLatest(listSeasonParcel.TRIGGER, listSeasonParcelSaga),
]