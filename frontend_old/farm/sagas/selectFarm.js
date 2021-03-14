import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'

import { selectFarm } from 'farm/actions'
import { FARM_SELECT } from 'farm/constants'
import { listSeasons } from 'season/actions'

export const KEY = 'selectFarmSaga'


export function *selectFarmSaga(payload) {
  // Set the new ID to the store
  //yield put(selectSeason.success(payload))
  // Trigger a parcel update
  yield put(listSeasons.trigger())   
  // TODO: How to select the latest season?
  //yield put(actionParcel.selectParcel(null))
}

export default () => [
    takeLatest(FARM_SELECT, selectFarmSaga),
]