import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { 
  actionSeason,
  createSeason
} from 'season/actions'
import { selectSelectedFarm } from 'farm/reducers/farms'
import SeasonApi from 'season/api'
import { normalizeSeason } from 'season/schemas'


export const KEY = 'createSeasonSaga'

export const createSeasonSaga = createRoutineFormSaga(
  createSeason,
  function *successGenerator(payload) {
    console.log("createSeasonSaga-actionPayload: ", payload)

    // Get the selected farm from the store
    const selectedFarm = yield select(selectSelectedFarm)
    if (selectedFarm) {
      const season = yield call(SeasonApi.createSeasons, selectedFarm, payload)  
      console.log("createSeasonSaga-season: ", season)
      yield put(createSeason.success({ 
        ...normalizeSeason(season)
      }))  
      // Set the current season to the new one
      yield put(actionSeason.setSeason({selectedSeasonId: season}))  
    }
    

    /*
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
      yield put(createParcel.success({ 
        ...normalizeParcels([parcel])
      }))     
      // Assign the new parcel to the parent parcel
      yield put(actionParcel.addParcel({groupId: parentParcel.id, parcelId: parcel.id})) 
      
    } else if (parentSeason) {
      // Create a new parcel under the specified season
      parcel = yield call(ParcelApi.createSeasonParcels, parentSeason, payload)  
      console.log("POST response: ", parcel)
      // Trigger the action success
      console.log("Trigger: createParcel.success")
      yield put(createParcel.success({ 
        ...normalizeParcels([parcel])
      }))     
      // Assign the new parcel to the season
      yield put(actionSeason.addParcel({seasonId: parentSeason.id, parcelId: parcel.id})) 

    } else {
      // TODO: Maybe later to just create a parcel without parents? Not a good idea ...
      console.log("Error: ", parentSeason, parentParcel)
    }
    */
    
  },
)

export default () => [
  takeLatest(createSeason.TRIGGER, createSeasonSaga),
]