import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listCropVariants } from 'crop/actions'
import CropApi from 'crop/api'

export const KEY = 'cropVariant'

export const listCropVariantsSaga = createRoutineSaga(
    listCropVariants,
    function *successGenerator(payload) {
        const cropVariants = yield call(CropApi.listCropVariants, payload)
        yield put(listCropVariants.success({
            cropVariants
        }))
    }
)

export default() => [
    takeLatest(listCropVariants.TRIGGER, listCropVariantsSaga),
]