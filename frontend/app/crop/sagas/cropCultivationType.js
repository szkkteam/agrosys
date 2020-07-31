import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listCropCultivationTypes } from 'crop/actions'
import CropApi from 'crop/api'

export const KEY = 'cropCultivationType'

export const listCropCultivationTypesSaga = createRoutineSaga(
    listCropCultivationTypes,
    function *successGenerator(payload) {
        console.log("Saga: ", payload)
        const cropCultivationTypes = yield call(CropApi.listCropCultivationTypes, payload)
        yield put(listCropCultivationTypes.success({
            cropCultivationTypes
        }))
    }    
)

export default() => [
    takeLatest(listCropCultivationTypes.TRIGGER, listCropCultivationTypesSaga),
]