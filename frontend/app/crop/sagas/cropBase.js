import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listCropBases } from 'crop/actions'
import CropApi from 'crop/api'

export const KEY = 'cropBase'

export const listCropBasesSaga = createRoutineSaga(
    listCropBases,
    function *successGenerator(payload) {
        const cropBases = yield call(CropApi.listCropBases, payload)
        yield put(listCropBases.success({
            cropBases
        }))
    }
)

export default() => [
    takeLatest(listCropBases.TRIGGER, listCropBasesSaga),
]