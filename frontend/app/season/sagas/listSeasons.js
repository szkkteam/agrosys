import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listSeasons } from 'season/actions'
import { listSeasonParcel } from 'parcel/actions'
import SeasonApi from 'season/api'
import { selectSeasons } from 'season/reducers/seasons'
import { selectCurrentFarm } from 'farm/selectors'

export const KEY = 'listSeasons'

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
        const id = yield select(selectCurrentFarm)
        if (id) {
            const seasons = yield call(SeasonApi.listSeasons, {id})
            yield put(listSeasons.success({
                seasons
            }))

        }
    }
)

export default() => [
    takeEvery(listSeasons.MAYBE_TRIGGER, maybeListSeasonsSaga),
    takeLatest(listSeasons.TRIGGER, listSeasonsSaga),
]