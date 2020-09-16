import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listDefaultTemplates } from 'template/actions'
import TemplateApi from 'template/api'
import { selectDefaultTemplates } from 'template/reducers/defaultTemplates'
import { normalizeTemplates } from 'template/schemas'

export const KEY = 'defaultTemplates'

export const maybeListDefaultTemplatesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectDefaultTemplates)
    if (!(isLoaded || isLoading)) {
        yield put(listDefaultTemplates.trigger())
    }
}

export const listDefaultTemplatesSaga = createRoutineSaga(
    listDefaultTemplates,
    function *successGenerator() {
        // Get the selected farm from the store
        const templates = yield call(TemplateApi.listDefaultTemplates)
        yield put(listDefaultTemplates.success({
            ...normalizeTemplates(templates)
        }))            
    }
)

export default() => [
    takeEvery(listDefaultTemplates.MAYBE_TRIGGER, maybeListDefaultTemplatesSaga),
    takeLatest(listDefaultTemplates.TRIGGER, listDefaultTemplatesSaga),
]