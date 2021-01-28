import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { ROUTES as SECU_ROUTES, ROUTE_MAP as SECU_ROUTE_MAP } from 'security/routes'
import { ROUTES as APP_ROUTES, ROUTE_MAP as APP_ROUTE_MAP } from 'farmApp/routes'
import { createRoutineFormSaga } from 'sagas'

import { signUp } from 'security/actions'
import SecurityApi from 'security/api'


export const KEY = 'signUp'

export const signUpSaga = createRoutineFormSaga(
  signUp,
  function *successGenerator(payload) {
    const { token, user } = yield call(SecurityApi.signUp, payload)
    yield put(signUp.success({ token, user }))

    if (token) {
      
      yield put(push({
        pathname: APP_ROUTE_MAP[APP_ROUTES.DashboardHome].path,
      }))
    } else {
      yield put(push(SECU_ROUTE_MAP[SECU_ROUTES.PendingConfirmation].path))
    }
  },
)

export default () => [
  takeLatest(signUp.TRIGGER, signUpSaga),
]
