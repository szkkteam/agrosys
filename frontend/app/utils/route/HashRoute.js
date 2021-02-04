import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({
  component: Component,
  path,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={({ location, ...props}) => 
      location.hash === path && <Component location={location} {...props} />
  } 
  />
)
