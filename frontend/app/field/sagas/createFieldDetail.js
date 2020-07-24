import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { createFieldDetails } from 'field/actions'
import FieldApi from 'field/api'


export const KEY = 'createFieldDetails'

export const createFieldDetailsSaga = createRoutineFormSaga(
    createFieldDetails,
  function *successGenerator(actionPayload) {            
    const { selectedField, ...payload} = actionPayload
    console.log("payload: ", payload)
    const FieldDetail = yield call(FieldApi.createFieldDetails, selectedField, payload)
    yield put(createFieldDetails.success({ FieldDetail }))    
    //yield put(push(ROUTE_MAP[ROUTES.FieldDetail].toPath(field)))
    // TODO: Invalidate field data
    // TODO: push route to field detail 

    
  },
)

export default () => [
  takeLatest(createFieldDetails.TRIGGER, createFieldDetailsSaga),
]