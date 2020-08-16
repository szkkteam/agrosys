import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { createProductions, listProductions } from 'production/actions'
import ProductionApi from 'production/api'
import { storage } from 'utils'


export const KEY = 'createProductions'

export const createProductionsSaga = createRoutineFormSaga(
  createProductions,
  function *successGenerator(actionPayload) {            
    const { details, ...payload} = actionPayload
    //console.log("Production payload: ", payload)
    const production = yield call(ProductionApi.createProductions, payload)
    //const production = {id: 16}
    // TODO: Where to store the success result? Reducer?
    yield details.map(field => call(ProductionApi.assigFieldToProduction, field, production))

    storage.clearProductionForm()

    yield put(listProductions.trigger())
    yield put(push(ROUTE_MAP[ROUTES.ProductionList].toPath()))

  },
)

export default () => [
  takeLatest(createProductions.TRIGGER, createProductionsSaga),
]