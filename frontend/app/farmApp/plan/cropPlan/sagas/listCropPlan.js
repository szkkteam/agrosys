import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { createRoutineSaga } from 'sagas'

import { listCropPlan } from '../actions'
// TODO: Import API
import { cropPlans as fixture } from 'farmApp/fixtures'

import { selectCropPlanRequest } from '../reducers/cropPlanRequest'

export const KEY = 'listCropPlanSaga'

export const maybeListCropPlanSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectCropPlanRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listCropPlan.trigger())
    }
}

export const listCropPlanSaga = createRoutineSaga(
    listCropPlan,
    function *successGenerator() {
        // TODO: Call backend api
        // FIXME: Simulate network delay (250ms)
        yield delay(250)
        // TODO: Put result to redux-orm model
        yield put(listCropPlan.success({
            cropPlans: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listCropPlan.MAYBE_TRIGGER, maybeListCropPlanSaga),
    takeLatest(listCropPlan.TRIGGER, listCropPlanSaga)
]