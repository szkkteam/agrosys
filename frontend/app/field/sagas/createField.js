import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { createFields } from 'field/actions'
import FieldApi from 'field/api'


export const KEY = 'createField'

export const createFieldSaga = createRoutineFormSaga(
  createFields,
  function *successGenerator(actionPayload) {
    const { selectedFarm, ...payload} = actionPayload
    const field = yield call(FieldApi.createFields, selectedFarm, payload)
    yield put(createFields.success({ field }))
    // TODO: Redirect view to the field detail
    // TODO: Clear the MAP's state
    
  },
)

export default () => [
  takeLatest(createFields.TRIGGER, createFieldSaga),
]