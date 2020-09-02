import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { actionSeason } from 'season/actions'
import { 
  createParcel,
  actionParcel,
} from 'parcel/actions'

import ParcelApi from 'parcel/api'


export const KEY = 'createParcelSaga'

export const createParcelSaga = createRoutineFormSaga(
  createParcel,
  function *successGenerator(actionPayload) {

    // Extract the slected Season and parent parcel from the form
    const { parentSeason = null, parentParcel = null, ...payload} = actionPayload
    console.log("actionPayload: ", actionPayload)
    let parcel = null

    // First check if parent parcel is defined, because selectedSeason is always given.
    if (parentParcel) {
      // Create a new parcel under a specified parcel
      parcel = yield call(ParcelApi.createGroupParcels, parentParcel, payload)  
      // Trigger the action success
      console.log("Trigger: createParcel.success")
      yield put(createParcel.success({ parcels: [parcel] }))     
      // Assign the new parcel to the parent parcel
      yield put(actionParcel.addParcel({groupId: parentParcel.id, parcelId: parcel.id})) 
      
    } else if (parentSeason) {
      // Create a new parcel under the specified season
      parcel = yield call(ParcelApi.createSeasonParcels, parentSeason, payload)  
      console.log("POST response: ", parcel)
      // Trigger the action success
      console.log("Trigger: createParcel.success")
      yield put(createParcel.success({ parcels: [parcel] }))     
      // Assign the new parcel to the season
      yield put(actionSeason.addParcel({seasonId: parentSeason.id, parcelId: parcel.id})) 

    } else {
      // TODO: Maybe later to just create a parcel without parents? Not a good idea ...
      console.log("Error: ", parentSeason, parentParcel)
    }

    
  },
)

export default () => [
  takeLatest(createParcel.TRIGGER, createParcelSaga),
]