import { injectReducer, injectSagas } from 'utils/async'

export const withReducerParcelDetails = injectReducer(require('parcel/reducers/parcelDetail'))
export const withReducerParcelStatus = injectReducer(require('parcel/reducers/parcelStatus'))

export const withSagaListSeasonParcels = injectSagas(require('parcel/sagas/listSeasonParcel'))

export const withReducers = [
    withReducerParcelDetails, withReducerParcelStatus
]