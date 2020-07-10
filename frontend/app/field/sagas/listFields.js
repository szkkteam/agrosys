import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { listFields } from 'field/actions'
import FieldApi from 'field/api'
import { selectFields } from 'field/reducers/field'
import { selectSelectedFarm } from 'farm/reducers/farms'

export const KEY = 'listFields'

export const maybeListFieldsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectFields)
    if (!(isLoading || isLoaded)) {
        yield put(listFields.trigger())
    }
}

export const listFieldsSaga = createRoutineFormSaga(
    listFields,
    function *successGenerator(payload) {
        const selectedFarm = yield select(selectSelectedFarm)
        const fields = yield call(FieldApi.listFields, selectedFarm, payload)
        yield put(listFields.success({
            fields: fields,
        }))
    },
)

export default () => [
    takeEvery(listFields.MAYBE_TRIGGER, maybeListFieldsSaga),
    takeLatest(listFields.TRIGGER, listFieldsSaga)
]