import React, { useEffect, useMemo } from 'react'
import { Route, Switch, Redirect, matchPath } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'

import {
  routes as farmAppRoutes,
  ROUTES as farmAppRoutesKeys,
} from 'farmApp/routes'

import {
  routes as securityRoutes,
  ROUTES as securityRoutesKeys,
} from 'security/routes'

/**
 * Site
 */

import {
  Profile,
} from 'security/pages'

import {
  NotFound,
} from 'site/pages'

import { AnonymousRoute, ProtectedRoute } from 'utils/route'

/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {
  ...farmAppRoutesKeys,
  ...securityRoutesKeys,
}
console.debug("ROUTE KEYS: ", ROUTES)
/**
 * route details
 *
 * list of objects with keys:
 *  - key: component class name
 *  - path: the path for the component (in react router notation)
 *  - component: The component to use
 *  - routeComponent: optional, AnonymousRoute, ProtectedRoute or Route (default: Route)
 *  - label: optional, label to use for links (default: startCase(key))
 */

export const routes = [
  /**
   * farmApp routes
   */
  ...farmAppRoutes,
  
  /**
   * Security routes
   */
  ...securityRoutes,
 
  {
    key: ROUTES.Profile,
    path: '/profile',
    component: Profile,
    routeComponent: ProtectedRoute,
    label: 'Profile',
    props: { exact: true }
  },
]
console.debug("STATIC ROUTES: ", routes)
/**
 * ROUTE_MAP: A public lookup for route details by key
 */
export const ROUTE_MAP = {}

const complieRoutes = (routes, parentPath="") => {
  routes.forEach((route) => {
    let { component, key, label, path: relPath, routeComponent, props } = route
  
    if (!component) {
      throw new Error(`component was not specified for the ${key} route!`)
    }
    /*
    if (!relPath) {
      throw new Error(`path was not specified for the ${key} route!`)
    }
    */
    

    const path = parentPath + relPath

    if (route.routes?.length) {
      complieRoutes(route.routes, path)
    }

  
    ROUTE_MAP[key] = {
      path,
      relPath,
      toPath: compile(path),
      component,
      routeComponent: routeComponent || Route,
      label: label || startCase(key),
      props,
    }
  })
}
complieRoutes(routes)
console.debug("ROUTE_MAP: ", ROUTE_MAP)

// TODO: How to add the 404 route?
// cachedRoutes.push(<Route component={NotFound} key="*" />)
 
/*
  FIXME: Somehow for nested rotues the whole tree is re-rendered
*/
const CustomRouter = ({routes, parentMatch=""}) => {
  return (
      <Switch>
        {routes.map(({key, routes: children, layoutComponent: Layout = 'div'}) => {
          const { component: Component, path, relPath, props: rest, routeComponent: RouteComponent } = ROUTE_MAP[key]
          return (
            <RouteComponent 
              //path={`${parentMatch}${relPath}`}
              path={path}
              //key={path}
              key="1"
              component={props => {  
                  const { match } = props
                  return (
                    <Layout>
                      <Component {...props} /> 
                      {children && children.length > 0 ?
                        <CustomRouter {...props} routes={children} parentMatch={match.url}/>
                      : null}
                    </Layout>
                )  
                }}
              {...rest}
            />
          )
        })}
      </Switch>
  )
}

export default CustomRouter
