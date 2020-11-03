import "@babel/polyfill";

// this must come before everything else otherwise style cascading doesn't work as expected
import 'main.scss'

import { AppContainer as HotReloadContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
//import { createBrowserHistory } from 'history'
import history from 'utils/history'

import configureStore from 'configureStore'
import App from 'components/App'

import { enqueueNotification, closeNotification } from 'site/actions'

import { login } from 'security/actions'
import SecurityApi from 'security/api'
import { storage } from 'utils'

import { translationMessages } from 'i18n';

const _ = require("lodash")
const APP_MOUNT_POINT = document.getElementById('app')

const initialState = {}
//const history = createBrowserHistory()
const store = configureStore(initialState)

const renderRootComponent = (Component) => {
  ReactDOM.render(
    <HotReloadContainer>
      <Component store={store} history={history} messages={translationMessages} />
    </HotReloadContainer>,
    APP_MOUNT_POINT
  )
}

const token = storage.getToken()
store.dispatch(login.request())
SecurityApi.checkAuthToken(token)
  .then(({ user }) => {
    store.dispatch(login.success({ token, user }))
  })
  .catch(() => {
    store.dispatch(login.failure())
  })
  .then(() => {
    store.dispatch(login.fulfill())
    renderRootComponent(App)
    const isAuthenticated = store.getState().security.isAuthenticated
    const alreadyHasNotification = store.getState().notification.notifications.length > 0
    if (isAuthenticated && !alreadyHasNotification) {
      store.dispatch(enqueueNotification({
        message: 'Welcome back.',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
        },
    }))
    }
  })

if (module.hot) {
  module.hot.accept(['./i18n', './components/App'], () => {
    ReactDOM.unmountComponentAtNode(APP_MOUNT_POINT)
    const NextApp = require('./components/App').default
    renderRootComponent(NextApp)
  })
}
