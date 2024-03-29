import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { ROUTES, ROUTE_MAP } from 'farmApp/routes'
import { createRoutineFormSaga } from 'sagas'

import { resetPassword } from 'security/actions'
import SecurityApi from 'security/api'


export const KEY = 'resetPassword'

export const resetPasswordSaga = createRoutineFormSaga(
  resetPassword,
  function *successGenerator(actionPayload) {
    const { token: resetToken, ...payload } = actionPayload
    const { token, user } = yield call(SecurityApi.resetPassword, resetToken, payload)
    yield put(resetPassword.success({ token, user }))
    yield put(push(ROUTE_MAP[ROUTES.DashboardHome].path))
    //yield put(flashSuccess('Welcome back! Your password has been successfully changed.'))
  },
)

export default () => [
  takeLatest(resetPassword.TRIGGER, resetPasswordSaga),
]
