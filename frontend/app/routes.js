import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'

import {
  FarmCreate,
  FarmDashboard,
} from 'farmApp/farm/pages'

import {
  BlockList,
  BlockCreateDraw,
  BlockCreateUpload,
  BlockCreateLPIS
} from 'farmApp/block/pages'

import {
  ProductionMultiView,
  ProductionCreate,
  ProductionDetail,
} from 'farmApp/production/pages'

import {
  ForgotPassword,
  Login,
  Logout,
  PendingConfirmation,
  Profile,
  SignUp,
  ResendConfirmation,
  ResetPassword,
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
  // Farm
  FarmCreate: 'FarmCreate',
  FarmDashboard: 'FarmDashboard',
  // Block
  BlockList: 'BlockList',
  BlockCreateDraw: 'BlockCreateDraw',
  BlockCreateUpload: 'BlockCreateUpload',
  BlockCreateLPIS: 'BlockCreateLPIS',
  // Production
  ProductionMultiView: 'ProductionMultiView',
  ProductionCreate: 'ProductionCreate',
  ProductionDetail: 'ProductionDetail',
  
  ForgotPassword: 'ForgotPassword',
  Home: 'Home',
  Login: 'Login',
  Logout: 'Logout',
  PendingConfirmation: 'PendingConfirmation',
  Profile: 'Profile',
  ResendConfirmation: 'ResendConfirmation',
  ResetPassword: 'ResetPassword',  
  SignUp: 'SignUp',
  Styles: 'Styles',  
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

const routes = [
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
  // Block routes
  {    
    key: ROUTES.BlockCreateDraw, // This must come before BlockList
    path: '/fields/new/draw',
    component: BlockCreateDraw,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {    
    key: ROUTES.BlockCreateUpload, // This must come before BlockList
    path: '/fields/new/upload',
    component: BlockCreateUpload,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {    
    key: ROUTES.BlockCreateLPIS, // This must come before BlockList
    path: '/fields/new/lpis',
    component: BlockCreateLPIS,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    
    key: ROUTES.BlockList, //Block list must be in the end of the list, because it's accepting multiple routes (exact=false)
    path: '/fields',
    component: BlockList,
    routeComponent: ProtectedRoute,
  },
  // Production routes
  {
    key: ROUTES.ProductionCreate,
    path: '/productions/new',
    component: ProductionCreate,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.ProductionMultiView,
    path: '/productions/multi',
    component: ProductionMultiView,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.ProductionDetail,
    path: '/productions/:id',
    component: ProductionDetail,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.ForgotPassword,
    path: '/login/forgot-password',
    component: ForgotPassword,
    routeComponent: AnonymousRoute,
    label: 'Forgot password?',
    props: { exact: true }
  },
  {
    key: ROUTES.Home,
    path: '/',
    component: Dashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.Login,
    path: '/login',
    component: Login,
    routeComponent: AnonymousRoute,
    label: 'Login',
    props: { exact: true }
  },
  {
    key: ROUTES.Logout,
    path: '/logout',
    component: Logout,
    label: 'Logout',
    props: { exact: true }
  },
  {
    key: ROUTES.PendingConfirmation,
    path: '/sign-up/pending-confirm-email',
    component: PendingConfirmation,
    routeComponent: AnonymousRoute,
    label: 'Pending Confirm Email',
    props: { exact: true }
  },
  {
    key: ROUTES.Profile,
    path: '/profile',
    component: Profile,
    routeComponent: ProtectedRoute,
    label: 'Profile',
    props: { exact: true }
  },
  {
    key: ROUTES.ResendConfirmation,
    path: '/sign-up/resend-confirmation-email',
    component: ResendConfirmation,
    routeComponent: AnonymousRoute,
    label: 'Resend Confirmation Email',
    props: { exact: true }
  },
  {
    key: ROUTES.ResetPassword,
    path: '/login/reset-password/:token',
    component: ResetPassword,
    routeComponent: AnonymousRoute,
    label: 'Reset Password',
    props: { exact: true }
  },
    {
    key: ROUTES.SignUp,
    path: '/sign-up',
    component: SignUp,
    routeComponent: AnonymousRoute,
    label: 'Sign Up',
    props: { exact: true }
  },
]

/**
 * ROUTE_MAP: A public lookup for route details by key
 */
export const ROUTE_MAP = {}
routes.forEach((route) => {
  let { component, key, label, path, routeComponent, props } = route

  if (!component) {
    throw new Error(`component was not specified for the ${key} route!`)
  }
  if (!path) {
    throw new Error(`path was not specified for the ${key} route!`)
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

/**
 * React Router 4 re-renders all child components of Switch statements on
 * every page change. Therefore, we render routes ahead of time once.
 */
const cachedRoutes = routes.map((route) => {
  const { component, path, props, routeComponent: RouteComponent } = ROUTE_MAP[route.key]
  //return <RouteComponent exact={true} path={path} component={component} key={path} />
  return <RouteComponent path={path} component={component} key={path} {...props}/>
})
cachedRoutes.push(<Route component={NotFound} key="*" />)

export default () => {
  return (
      <Switch>
        {cachedRoutes}
      </Switch>
  )
}