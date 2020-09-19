import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineSaga } from 'sagas'

import { setSeason } from 'season/actions'
import { selectSelectedSeasons } from 'season/reducers/seasons'
import { listSeasonParcel, actionParcel } from 'parcel/actions'

export const KEY = 'setSeasonSaga'


export const maybeSetSeasonsSaga = function *({ payload }) {
    console.log("maybeSetSeasonsSaga-payload: ", payload)
    const { selectedSeasonId } = payload    
    const selectedSeason = yield select(selectSelectedSeasons)
    if (!selectedSeason || (selectedSeason.id != selectedSeasonId)) {
        yield put(setSeason.trigger(payload))
    }   
}


export const setSeasonSaga = createRoutineSaga(
    setSeason,
  function *successGenerator(payload) {
    console.log("setSeasonSaga-payload: ", payload)
    // Set the new ID to the store
    yield put(setSeason.success(payload))
    // Trigger a parcel update
    yield put(listSeasonParcel.trigger())   
    // Deselect current parcel
    yield put(actionParcel.selectParcel({
        selectedParcelId: null
    }))
  },
)

export default () => [
    takeEvery(setSeason.MAYBE_TRIGGER, maybeSetSeasonsSaga),
    takeLatest(setSeason.TRIGGER, setSeasonSaga),
]