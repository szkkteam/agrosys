import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import { createRoutineSaga } from 'sagas'

import { listSpecificProducts } from 'reference/actions'
import ProductApi from 'reference/api'
import { selectSpecificProducts } from 'reference/reducers/specificProducts'
//import { normalizeSoilTypes } from 'reference/schemas'

export const KEY = 'specificProduct'

export const maybeListSpecificProductsSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectSpecificProducts)
    if (!(isLoaded || isLoading)) {
        yield put(listSpecificProducts.trigger())
    }
}

export const listSpecificProductsSaga = createRoutineSaga(
    listSpecificProducts,
    function *successGenerator() {
        /*
        const specificProducts = yield call(ProductApi.listSpecificProducts)
        yield put(listSpecificProducts.success({
            ...normalizeSoilTypes(specificProducts)
        }))
        */
    }
)

export default() => [
    takeEvery(listSpecificProducts.MAYBE_TRIGGER, maybeListSpecificProductsSaga),
    takeLatest(listSpecificProducts.TRIGGER, listSpecificProductsSaga),
]
