import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineSaga } from 'sagas'

import { loadProductionDetail } from 'production/actions'
import ProductionApi from 'production/api'
import { selectProductionDetail } from 'production/reducers/productionDetail'


export const KEY = 'productionDetail'

export const maybeLoadProductionDetailSaga = function *(production) {   
    const { byId, isLoading } = yield select(selectProductionDetail)
    //console.log("field: ", field)
    //console.log("field.id: ", field.payload.id)
    const isLoaded = !!byId[production.payload.id]
    //console.log("isLoaded: ", isLoaded)
    //console.log("isLoading: ", isLoading)
    if (!(isLoaded || isLoading)) {
      yield put(loadProductionDetail.trigger(production))
    }
  }


export const loadProductiondDetailSaga = createRoutineSaga(
    loadProductionDetail,
    function *successGenerator({ payload: payloadProduction} ) {
        const production = yield call(ProductionApi.loadProductionDetail, payloadProduction)
        yield put(loadProductionDetail.success({
            production: production,
        }))
    }
)


export default () => [
    takeEvery(loadProductionDetail.MAYBE_TRIGGER, maybeLoadProductionDetailSaga),
    takeLatest(loadProductionDetail.TRIGGER, loadProductiondDetailSaga),
  ]
