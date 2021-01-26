import { call, put, takeLatest } from 'redux-saga/effects'
import { popModalWindow } from 'redux-promising-modals';
import { delay } from 'redux-saga'
import { enqueueNotification, closeNotification } from 'site/actions'
import { userCropCreated } from '../notifications'

import { createRoutineFormSaga } from 'sagas'

import { createUserCrop } from '../actions'

export const KEY = 'createUserCropSaga'

function getRandomInt(max = 10000) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export const createUserCropSaga = createRoutineFormSaga(
    createUserCrop,
  function *successGenerator(payload) {

    // TODO: Call backend api
    // FIXME: Simulate network delay (250ms)
    yield delay(250)

    // FIXME: Random ID generated for now
    const id = getRandomInt()
    const payloadWithId = Object.assign(payload, {id})

    // TODO: Put result to redux-orm model
    yield put(createUserCrop.success({
        userCrop: payloadWithId,
    }))   
    // Close the popup when the form is submitted successfully
    yield put(popModalWindow())
    // Push notification
    yield put(enqueueNotification(userCropCreated(payloadWithId)))

  },
)

export default () => [
  takeLatest(createUserCrop.TRIGGER, createUserCropSaga),
]