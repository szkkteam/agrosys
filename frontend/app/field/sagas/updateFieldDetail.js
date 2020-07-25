import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { updateFieldDetails } from 'field/actions'
import FieldApi from 'field/api'


export const KEY = 'updateFieldDetails'

export const updateFieldDetailsSaga = createRoutineFormSaga(
  updateFieldDetails,
  function *successGenerator(actionPayload) {            
    const { selectedId, ...payload} = actionPayload
    console.log("payload: ", payload)
    console.log("selectedId: ", selectedId)
    const FieldDetail = yield call(FieldApi.updateFieldDetails, selectedId, payload)
    yield put(updateFieldDetails.success({ FieldDetail }))    
    //yield put(push(ROUTE_MAP[ROUTES.FieldDetail].toPath(field)))
    // TODO: Invalidate field data
    // TODO: push route to field detail 

    
  },
)

export default () => [
  takeLatest(updateFieldDetails.TRIGGER, updateFieldDetailsSaga),
]