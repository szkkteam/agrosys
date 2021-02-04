import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ROUTE_MAP, ROUTES } from 'farmApp/routes'

import { createRoutineFormSaga } from 'sagas'

import { login } from 'security/actions'
import SecurityApi from 'security/api'


export const KEY = 'login'

export const loginSaga = createRoutineFormSaga(
  login,
  function *successGenerator(actionPayload) {    
    // Default redirect to the dashboard home
    const defaultRedirect = ROUTE_MAP[ROUTES.DashboardOverview].toPath()

    const { redirect=defaultRedirect, ...payload } = actionPayload
    const { token, user } = yield call(SecurityApi.login, payload)
    yield put(login.success({ token, user }))
    yield put(push(redirect))
    //yield put(flashSuccess('You have been successfully logged in.'))
  },
)

export default () => [
  takeLatest(login.TRIGGER, loginSaga),
]
