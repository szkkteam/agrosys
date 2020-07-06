import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { createFields } from 'field/actions'
import FieldApi from 'field/api'
import { storage } from 'utils'


export const KEY = 'signUp'

export const createFieldSaga = createRoutineFormSaga(
  createFields,
  function *successGenerator(payload) {
    console.log(payload)
    const farm = storage.getActiveFarm()
    const field = yield call(FieldApi.createFields, farm, payload)
    yield put(createFields.success({ field }))
    // TODO: Redirect view to the field detail
    // TODO: Clear the MAP's state
    /*
    if (token) {
      yield put(push({
        pathname: ROUTE_MAP[ROUTES.Home].path,
        search: '?welcome',
      }))
    } else {
      yield put(push(ROUTE_MAP[ROUTES.PendingConfirmation].path))
    }
    */
  },
)

export default () => [
  takeLatest(createFields.TRIGGER, createFieldSaga),
]