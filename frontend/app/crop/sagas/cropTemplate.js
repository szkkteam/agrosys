import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listCropTemplates } from 'crop/actions'
import CropApi from 'crop/api'

export const KEY = 'cropTemplate'

export const listCropTemplatesSaga = createRoutineSaga(
    listCropTemplates,
    function *successGenerator(payload) {
        const cropTemplates = yield call(CropApi.listCropTemplates, payload)
        yield put(listCropTemplates.success({
            cropTemplates
        }))
    }
)

export default() => [
    takeLatest(listCropTemplates.TRIGGER, listCropTemplatesSaga),
]