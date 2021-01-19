import React, { useEffect, useMemo } from 'react'
import { Route, Switch, Redirect, matchPath } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'

import {
  DashboardHome
} from 'farmApp/dashboard/dashboard/pages'

import {
  routes as reportRoutes,
  ROUTES as reportRoutesKeys,
} from 'farmApp/report/routes'

import {
  routes as resourceRoutes,
  ROUTES as resourceRoutesKeys,
} from 'farmApp/resource/routes'

import {
  routes as productionRoutes,
  ROUTES as productionRoutesKeys,
} from 'farmApp/cropProduction/routes'

import {
  routes as securityRoutes,
  ROUTES as securityRoutesKeys,
} from 'security/routes'

/**
 * Resources
 */
import {
  FarmCreate,
  FarmDashboard,
} from 'farmApp/resource/farm/pages'

/**
 * Finance
 */

import {
  SaleDashboard
} from 'farmApp/finance/sale/pages'

import {
  ExpenseDashboard
} from 'farmApp/finance/expense/pages'

import {
  BudgetDashboard
} from 'farmApp/finance/budget/pages'

/**
 * Site
 */

import {
  Profile,
} from 'security/pages'

import {
  Dashboard,
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
  // Dashboard
  DashboardHome: 'DashboardHome',

  /**
   * Report keys
   */
  ...reportRoutesKeys,

  // Sale
  SaleDashboard: 'SaleDashboard',

  // Expense
  ExpenseDashboard: 'ExpenseDashboard',

  // Budget
  BudgetDashboard: 'BudgetDashboard',

  // Farm
  FarmCreate: 'FarmCreate',
  FarmDashboard: 'FarmDashboard',
  
  ...productionRoutesKeys,
  ...resourceRoutesKeys,
  ...securityRoutesKeys,
}

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
  // Dashboard routes
  {
    key: ROUTES.DashboardHome,
    path: '/',
    component: DashboardHome,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Report routes  
  ...reportRoutes,
  // Sale routes  
  {
    key: ROUTES.SaleDashboard,
    path: '/sales',
    component: SaleDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Expense routes  
  {
    key: ROUTES.ExpenseDashboard,
    path: '/expenses',
    component: ExpenseDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Budget routes  
  {
    key: ROUTES.BudgetDashboard,
    path: '/budgets',
    component: BudgetDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Farm routes
  {
    key: ROUTES.FarmCreate,
    path: '/farms/new',
    component: FarmCreate,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.FarmDashboard,
    path: '/farms/dashboard',
    component: FarmDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  /**
   * Resources routes
   */
  ...resourceRoutes,
  /**
   * Production routes
   */
  ...productionRoutes,
  
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

/**
 * ROUTE_MAP: A public lookup for route details by key
 */
export const ROUTE_MAP = {}

const complieRoutes = (routes) => {
  routes.forEach((route) => {
    let { component, key, label, path, routeComponent, props } = route
  
    if (!component) {
      throw new Error(`component was not specified for the ${key} route!`)
    }
    if (!path) {
      throw new Error(`path was not specified for the ${key} route!`)
    }

    if (route.routes?.length) {
      complieRoutes(route.routes)
    }
  
    ROUTE_MAP[key] = {
      path,
      toPath: compile(path),
      component,
      routeComponent: routeComponent || Route,
      label: label || startCase(key),
      props,
    }
  })
}
complieRoutes(routes)
console.log(ROUTE_MAP)

// TODO: How to add the 404 route?
// cachedRoutes.push(<Route component={NotFound} key="*" />)
 
/*
  FIXME: Somehow for nested rotues the whole tree is re-rendered
*/
const CustomRouter = ({routes}) => {
  return (
      <Switch>
        {routes.map(({key, routes: children, layoutComponent: Layout = 'div'}) => {
          const { component: Component, path, props: rest, routeComponent: RouteComponent } = ROUTE_MAP[key]
          return (
            <RouteComponent 
              path={path}
              //key={path}
              key="1"
              component={props => {  
                  return (
                    <Layout>
                      <Component {...props} /> 
                      {children && children.length > 0 ?
                        <CustomRouter {...props}  routes={children} />
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
