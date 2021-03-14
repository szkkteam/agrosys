import { call, put, takeLatest } from 'redux-saga/effects'
import { popModalWindow } from 'redux-promising-modals';
import { delay } from 'redux-saga'
//import { enqueueNotification, closeNotification } from 'site/actions'
//import { userCropCreated } from '../notifications'

import { createRoutineFormSaga } from 'sagas'

import { createPlan } from '../actions'

export const KEY = 'createPlanSaga'

function getRandomInt(max = 10000) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export const createPlanSaga = createRoutineFormSaga(
  createPlan,
  function *successGenerator(payload, meta) {
    console.debug("Payload: ", payload)
    console.debug("Meta: ", meta)
    // TODO: Call backend api
    // FIXME: Simulate network delay (250ms)
    
    yield delay(250)

    // FIXME: Random ID generated for now
    //const id = getRandomInt()
    //const payloadWithId = Object.assign(payload, {id})

    // TODO: Put result to redux-orm model
    /*
    yield put(createUserCrop.success({
        userCrop: payload,
    }))   
    */
    // Close the popup when the form is submitted successfully
    //yield put(popModalWindow())
    // Push notification
    //yield put(enqueueNotification(userCropCreated(payload)))

  },
)

export default () => [
  takeLatest(createPlan.TRIGGER, createPlanSaga),
]