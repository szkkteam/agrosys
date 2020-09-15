import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listTemplates } from 'template/actions'
import TemplateApi from 'template/api'
import { selectTemplates } from 'template/reducers/templates'
import { selectSelectedFarm } from 'farm/reducers/farms'
import { normalizeTemplates } from 'template/schemas'

export const KEY = 'templates'

export const maybeListTemplatesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectTemplates)
    if (!(isLoaded || isLoading)) {
        yield put(listTemplates.trigger())
    }
}

export const listTemplatesSaga = createRoutineSaga(
    listTemplates,
    function *successGenerator() {
        // Get the selected farm from the store
        const selectedFarm = yield select(selectSelectedFarm)
        if (selectedFarm) {
            const templates = yield call(TemplateApi.listTemplates, selectedFarm)
            yield put(listTemplates.success({
                ...normalizeTemplates(templates)
            }))            
        }
    }
)

export default() => [
    takeEvery(listTemplates.MAYBE_TRIGGER, maybeListTemplatesSaga),
    takeLatest(listTemplates.TRIGGER, listTemplatesSaga),
]