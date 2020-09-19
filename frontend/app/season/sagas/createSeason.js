import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { 
  setSeason,
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
      yield put(setSeason.trigger({selectedSeasonId: season.id}))  
    }
    
  },
)

export default () => [
  takeLatest(createSeason.TRIGGER, createSeasonSaga),
]