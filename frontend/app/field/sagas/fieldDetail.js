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
    const isLoaded = !!byId[field.id]
    if (!(isLoaded || isLoading)) {
      yield put(loadFieldDetail.trigger(field))
    }
  }


export const loadFieldDetailSaga = createRoutineSaga(
    loadFieldDetail,
    function *successGenerator({ payload: payloadField }) {
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
