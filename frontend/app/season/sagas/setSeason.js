import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineSaga } from 'sagas'

import { setSeason } from 'season/actions'
import { selectSelectedSeason } from 'season/reducers/seasonDetail'
import { listSeasonParcel, actionParcel } from 'parcel/actions'

export const KEY = 'setSeasonSaga'

/*
export const maybeSetSeasonsSaga = function *({ payload }) {
    const selectedSeasonId = payload    
    const selectedSeason = yield select(selectSelectedSeason)
    if (!selectedSeason || (selectedSeason != selectedSeasonId)) {
        yield put(setSeason.trigger(payload))
    } 
}


export const setSeasonSaga = createRoutineSaga(
    setSeason,
  function *successGenerator(payload) {
    // Set the new ID to the store
    yield put(setSeason.success(payload))
    // Trigger a parcel update
    yield put(listSeasonParcel.trigger())   
    // Deselect current parcel
    yield put(actionParcel.selectParcel(null))
  },
)
*/

export function *setSeasonSaga(payload) {
  // Set the new ID to the store
  yield put(setSeason.success(payload))
  // Trigger a parcel update
  yield put(listSeasonParcel.trigger())   
  // Deselect current parcel
  yield put(actionParcel.selectParcel(null))
}

export default () => [
    //takeEvery(setSeason.MAYBE_TRIGGER, maybeSetSeasonsSaga),
    takeLatest(setSeason.TRIGGER, setSeasonSaga),
]