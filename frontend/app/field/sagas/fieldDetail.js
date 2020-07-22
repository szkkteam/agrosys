import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineSaga } from 'sagas'

import { loadFieldDetail } from 'field/actions'
import FieldApi from 'field/api'
import { selectFieldDetail } from 'field/reducers/fieldDetail'


export const KEY = 'fieldDetail'

export const maybeLoadFieldDetailSaga = function *(field) {   
    const { byId, isLoading } = yield select(selectFieldDetail)
    console.log("field: ", field)
    console.log("field.id: ", field.payload.id)
    const isLoaded = !!byId[field.payload.id]
    console.log("isLoaded: ", isLoaded)
    console.log("isLoading: ", isLoading)
    if (!(isLoaded || isLoading)) {
      yield put(loadFieldDetail.trigger(field))
    }
  }


export const loadFieldDetailSaga = createRoutineSaga(
    loadFieldDetail,
    function *successGenerator({ payload: payloadField }) {
      console.log("loadFieldDetailSaga::payloadField: ", payloadField)
        const field = yield call(FieldApi.loadFieldDetail, payloadField)
        yield put(loadFieldDetail.success({
            field: field,
        }))
    }
)


export default () => [
    takeEvery(loadFieldDetail.MAYBE_TRIGGER, maybeLoadFieldDetailSaga),
    takeLatest(loadFieldDetail.TRIGGER, loadFieldDetailSaga),
  ]
