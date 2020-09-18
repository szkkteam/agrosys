import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listSeasons } from 'season/actions'
import { listSeasonParcel } from 'parcel/actions'
import SeasonApi from 'season/api'
import { selectSeasons } from 'season/reducers/seasons'
import { selectSelectedFarm } from 'farm/reducers/farms'
import { normalizeSeasons } from 'season/schemas'

export const KEY = 'seasons'

export const maybeListSeasonsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectSeasons)
    if (!(isLoaded || isLoading)) {
        yield put(listSeasons.trigger())
    }
}

export const listSeasonsSaga = createRoutineSaga(
    listSeasons,
    function *successGenerator() {
        // Get the selected farm from the store
        const selectedFarm = yield select(selectSelectedFarm)
        if (selectedFarm) {
            const seasons = yield call(SeasonApi.listSeasons, selectedFarm)
            yield put(listSeasons.success({
                ...normalizeSeasons(seasons)
            }))
            // Get the parcels from the last season
            if (seasons.length) {
                yield put(listSeasonParcel.trigger({
                    selectedSeason: _.last(seasons)
                }))
            }
        }
    }
)

export default() => [
    takeEvery(listSeasons.MAYBE_TRIGGER, maybeListSeasonsSaga),
    takeLatest(listSeasons.TRIGGER, listSeasonsSaga),
]