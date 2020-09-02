import { call, put, select, takeLatest } from 'redux-saga/effects'
import { createRoutineFormSaga } from 'sagas'
import { updateParcel } from 'parcel/actions'
import ParcelApi from 'parcel/api'


export const KEY = 'updateParcel'

export const updateParcelSaga = createRoutineFormSaga(
    updateParcel,
    function *successGenerator(actionPayload) {
        // Extract unwanted fields from the form
        const { id, parentSeason, parentParcel, ...payload} = actionPayload
        console.log("actionPayload: ", actionPayload)
        const parcel = yield call(ParcelApi.updateParcel, {id}, payload)
        yield put(updateParcel.success({ parcels: [parcel] }))        
    },
)

export default () => [
  takeLatest(updateParcel.TRIGGER, updateParcelSaga),
]