import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'

import { selectSeason } from 'season/actions'
import { SEASON_SELECT } from 'season/constants'
import { listSeasonParcel, actionParcel } from 'parcel/actions'

export const KEY = 'selectSeasonSaga'


export function *selectSeasonSaga(payload) {
  // Set the new ID to the store
  //yield put(selectSeason.success(payload))
  // Trigger a parcel update
  yield put(listSeasonParcel.trigger())   
  // Deselect current parcel
  yield put(actionParcel.selectParcel(null))
}

export default () => [
    //takeEvery(setSeason.MAYBE_TRIGGER, maybeSetSeasonsSaga),
    takeLatest(SEASON_SELECT, selectSeasonSaga),
]