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
import { normalizeParcels } from 'parcel/schemas'
import { normalizeSeasons } from 'season/schemas'


export const KEY = 'createParcelSaga'

export const createParcelSaga = createRoutineFormSaga(
  createParcel,
  function *successGenerator(actionPayload) {

    // Extract the slected Season and parent parcel from the form
    const { parentSeason = null, parentParcel = null, ...payload} = actionPayload
    // First check if parent parcel is defined, because selectedSeason is always given.
    if (parentParcel) {
      // Create a new parcel under a specified parcel
      const parcel = yield call(ParcelApi.createGroupParcels, parentParcel, payload)  
      // Trigger the action success
      parentParcel.parcels.push(parcel)
      console.log("createParcelSaga-parentParcel: ", parentParcel)
      yield put(createParcel.success({ 
        ...normalizeParcels([parentParcel])
      }))     
      // Assign the new parcel to the parent parcel
      //yield put(actionParcel.addParcel({groupId: parentParcel.id, parcelId: parcel.id})) 
      
    } else if (parentSeason) {
      // Create a new parcel under the specified season
      const parcel = yield call(ParcelApi.createSeasonParcels, parentSeason, payload)  
      // Trigger the action success
      parentSeason.referenceParcels.push(parcel)
      yield put(createParcel.success({ 
        ...normalizeSeasons([parentSeason])
      }))     
      // Assign the new parcel to the season
      //yield put(actionSeason.addParcel({seasonId: parentSeason.id, parcelId: parcel.id})) 

    } else {
      // TODO: Maybe later to just create a parcel without parents? Not a good idea ...
      console.log("Error: ", parentSeason, parentParcel)
    }

    
  },
)

export default () => [
  takeLatest(createParcel.TRIGGER, createParcelSaga),
]