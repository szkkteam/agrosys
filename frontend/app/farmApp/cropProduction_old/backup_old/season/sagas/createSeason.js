import { call, put, takeLatest } from 'redux-saga/effects'
import { popModalWindow } from 'redux-promising-modals';
import { delay } from 'redux-saga'
import { enqueueNotification, closeNotification } from 'site/actions'
import { seasonCreated } from '../notifications'
import { push } from 'connected-react-router'
import { ROUTE_MAP, ROUTES } from 'farmApp/routes'

import { getId } from 'utils'

import { createRoutineFormSaga } from 'sagas'

import { createSeason } from '../actions'

export const KEY = 'createSeasonSaga'

export const createSeasonSaga = createRoutineFormSaga(
  createSeason,
  function *successGenerator(payloadData) {
    const { userCropId, ...payload } = payloadData


    // TODO: Call backend api
    // FIXME: Simulate network delay (250ms)
    yield delay(250)
    // FIXME: Random ID generated for now
    //const id = getRandomInt()
    const payloadWithId = Object.assign(payload, {id: getId()})

    // TODO: Put result to redux-orm model
    yield put(createSeason.success({
        season: payloadWithId, userCropId
    }))   
    const redirect = ROUTE_MAP[ROUTES.CropProductionSeason]

    console.debug("SeasonCreate-payload: ", payloadWithId)
    console.debug("SeasonCreate-redirect: ", redirect.toPath({cropId: userCropId, seasonId: payloadWithId.id}))
    // Navigate
    yield put(push(redirect.toPath({cropId: userCropId, seasonId: payloadWithId.id})))
    
    // Push notification
    yield put(enqueueNotification(seasonCreated(payloadWithId)))
  },
)

export default () => [
  takeLatest(createSeason.TRIGGER, createSeasonSaga),
]