import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { createProductions } from 'production/actions'
import ProductionApi from 'production/api'


export const KEY = 'createProductions'

export const createProductionsSaga = createRoutineFormSaga(
  createProductions,
  function *successGenerator(actionPayload) {            
    const { details, ...payload} = actionPayload
    console.log("payload: ", payload)
    console.log("details: ", details)
    // TODO: Create production, and use the response id to assign the members in a for loop
    //console.log("selectedId: ", selectedId)
    //const FieldDetail = yield call(createProductions.createProductions, payload)
    //yield put(updateFieldDetails.success({ FieldDetail }))    
    //yield put(push(ROUTE_MAP[ROUTES.FieldDetail].toPath(field)))
    // TODO: Invalidate field data
    // TODO: push route to field detail 

    
  },
)

export default () => [
  takeLatest(createProductions.TRIGGER, createProductionsSaga),
]