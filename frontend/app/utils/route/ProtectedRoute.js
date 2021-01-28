import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES, ROUTE_MAP } from 'security/routes'


export default (props) => {
  const {
    component: Component,
    location,
    ...routeProps
  } = props
  const isAuthenticated = useSelector(state => state.security.isAuthenticated)

  return <Route {...routeProps} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
          pathname: ROUTE_MAP[ROUTES.Login].path,
          search: `?next=${location.pathname}`,
        }} />
  )} />
}
