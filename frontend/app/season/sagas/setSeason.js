import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineSaga } from 'sagas'

import { setSeason } from 'season/actions'
import { selectSelectedSeasons } from 'season/reducers/seasons'
import { listSeasonParcel } from 'parcel/actions'

export const KEY = 'setSeasonSaga'


export const maybeSetSeasonsSaga = function *({ payload }) {
    const { selectedSeasonId } = payload    
    console.log("maybeSetSeasonsSaga-payload: ", payload)

    const selectedSeason = yield select(selectSelectedSeasons)
    if (!selectedSeason || (selectedSeason.id != selectedSeasonId)) {
        console.log("maybeSetSeasonsSaga-trigger: ", payload)
        yield put(setSeason.trigger({
            payload
        }))
    }   
}


export const setSeasonSaga = createRoutineSaga(
    setSeason,
  function *successGenerator({ payload }) {
    console.log("setSeasonSaga-payload: ", payload)
    // Set the new ID to the store
    yield put(setSeason.success(payload))
    // Trigger a parcel update
    yield put(listSeasonParcel.trigger())   

  },
)

export default () => [
    takeEvery(setSeason.MAYBE_TRIGGER, maybeSetSeasonsSaga),
    takeLatest(setSeason.TRIGGER, setSeasonSaga),
]