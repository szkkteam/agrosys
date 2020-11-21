import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Route, Redirect } from 'react-router-dom'

import { enqueueNotification } from 'site/actions'
import { ROUTES, ROUTE_MAP } from 'routes'


const UnconnectedProtectedRoute = (props) => {
  const {
    component: Component,
    isAuthenticated,
    location,
    ...routeProps
  } = props

  return <Route {...routeProps} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
          pathname: ROUTE_MAP[ROUTES.Login].path,
          search: `?next=${location.pathname}`,
        }} />
  )} />
}

export const ProtectedRoute = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
)(UnconnectedProtectedRoute)


class UnconnectedAnonymousRoute extends React.Component {
  componentDidMount() {
    const { isAuthenticated, push, enqueueNotification } = this.props
    if (isAuthenticated) {
      push(ROUTE_MAP[ROUTES.DashboardHome].path)
      enqueueNotification({
        message: 'You are already logged in.',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
        },
      })
    }
  }

  render() {
    const {
      component: Component,
      isAuthenticated,
      push,
      flashInfo,
      ...routeProps
    } = this.props

    return <Route {...routeProps} render={(props) => <Component {...props} />} />
  }
}

export const AnonymousRoute = connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
  (dispatch) => bindActionCreators({ enqueueNotification, push }, dispatch),
)(UnconnectedAnonymousRoute)
