import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listUserTemplates } from 'template/actions'
import TemplateApi from 'template/api'
import { selectUserTemplates } from 'template/reducers/userTemplates'
import { selectSelectedFarm } from 'farm/reducers/farms'
import { normalizeTemplates } from 'template/schemas'

export const KEY = 'userTemplates'

export const maybeListUserTemplatesSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectUserTemplates)
    if (!(isLoaded || isLoading)) {
        yield put(listUserTemplates.trigger())
    }
}

export const listUserTemplatesSaga = createRoutineSaga(
    listUserTemplates,
    function *successGenerator() {
        // Get the selected farm from the store
        const selectedFarm = yield select(selectSelectedFarm)
        if (selectedFarm) {
            const templates = yield call(TemplateApi.listUserTemplates, selectedFarm)
            yield put(listUserTemplates.success({
                ...normalizeTemplates(templates)
            }))            
        }
    }
)

export default() => [
    takeEvery(listUserTemplates.MAYBE_TRIGGER, maybeListUserTemplatesSaga),
    takeLatest(listUserTemplates.TRIGGER, listUserTemplatesSaga),
]