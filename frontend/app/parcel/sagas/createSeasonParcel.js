import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { selectSelectedSeasons } from 'season/reducers/seasons'
import { createSeasonParcel } from 'parcel/actions'
import ParcelApi from 'parcel/api'


export const KEY = 'createSeasonParcel'

export const createSeasonParcelSaga = createRoutineFormSaga(
  createSeasonParcel,
  function *successGenerator(actionPayload) {

    // Extract the slected Season from the form, or from the store
    const { selectedSeason = yield select(selectSelectedSeasons) 
      , ...payload} = actionPayload
    const parcel = yield call(ParcelApi.createSeasonParcels, selectedSeason, payload)
    yield put(createSeasonParcel.success({ parcels: [parcel] }))        
  },
)

export default () => [
  takeLatest(createSeasonParcel.TRIGGER, createSeasonParcelSaga),
]