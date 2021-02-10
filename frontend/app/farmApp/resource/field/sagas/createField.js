import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { delay } from 'redux-saga'
import { enqueueNotification, closeNotification } from 'site/actions'
import { fieldsCreated } from '../notifications'
import { ROUTE_MAP, ROUTES } from 'farmApp/routes'

import { createRoutineFormSaga } from 'sagas'

import { createField } from '../actions'

export const KEY = 'createFieldSaga'

function getRandomInt(max = 10000) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export const createFieldSaga = createRoutineFormSaga(
  createField,
  function *successGenerator(payload) {
    const redirect = ROUTE_MAP[ROUTES.ResourceField].toPath()
    const { fields } = payload

    let result = []
    if (Array.isArray(fields)) {
      // yield files.map(file => call(uploadImageApi , file));
      for(const i in fields) {
        yield delay(150)

        // FIXME: Random ID generated for now
        const id = getRandomInt()
        const payloadWithId = Object.assign(fields[i], {id})        
        result.push(payloadWithId)
      }
    } else {
      // TODO: Call backend api
      // FIXME: Simulate network delay (250ms)
      yield delay(250)

      // FIXME: Random ID generated for now
      const id = getRandomInt()
      const payloadWithId = Object.assign(fields, {id})

      result.push(payloadWithId)
    }

    // TODO: Put result to redux-orm model
    yield put(createField.success({
        fields: result,
    }))   
    // Close the popup when the form is submitted successfully
    
    // Push notification
    yield put(enqueueNotification(fieldsCreated(result)))
    yield put(push(redirect))
  },
)

export default () => [
  takeLatest(createField.TRIGGER, createFieldSaga),
]