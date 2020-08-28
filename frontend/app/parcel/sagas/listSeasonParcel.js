import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listSeasonParcel } from 'parcel/actions'
import ParcelApi from 'parcel/api'
import { selectParcels } from 'parcel/reducers/parcels'
import { selectSelectedSeasons } from 'season/reducers/seasons'

export const KEY = 'listSeasonParcel'

export const maybeListSeasonParcelSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectParcels)
    if (!(isLoaded || isLoading)) {
        yield put(listSeasonParcel.trigger())
    }
}

export const listSeasonParcelSaga = createRoutineSaga(
    listSeasonParcel,
    function *successGenerator() {
        // Get the selected farm from the store
        const selectedSeason = yield select(selectSelectedSeasons) 
        if (selectedSeason) {
            const parcels = yield call(ParcelApi.listSeasonParcels, selectedSeason)
            yield put(listSeasonParcel.success({
                parcels
            }))
        }
    }
)

export default() => [
    takeEvery(listSeasonParcel.MAYBE_TRIGGER, maybeListSeasonParcelSaga),
    takeLatest(listSeasonParcel.TRIGGER, listSeasonParcelSaga),
]