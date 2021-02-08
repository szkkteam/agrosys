import React, { useEffect } from 'react'
import Container from 'components/Layout/Container'
import { compileRoutes } from 'utils/route/utils'

/**
 * Site
 */

import {
  ForgotPassword,
  Login,
  Logout,
  PendingConfirmation,
  SignUp,
  ResendConfirmation,
  ResetPassword,
  AuthHeader,
} from 'security/pages'

import AnonymousRoute from 'utils/route/AnonymousRoute'
/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {
 
  Authentication: 'Authentication',
  ForgotPassword: 'ForgotPassword',
  Login: 'Login',
  Logout: 'Logout',
  PendingConfirmation: 'PendingConfirmation',
  Profile: 'Profile',
  ResendConfirmation: 'ResendConfirmation',
  ResetPassword: 'ResetPassword',  
  SignUp: 'SignUp',
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
 
  /**
   * Security routes
   */
  {
    key: ROUTES.Authentication,
    path: '/security',
    component: AuthHeader,
    label: 'Authentication',
    layoutComponent: Container,
    routes: [
            {
        key: ROUTES.Login,
        path: '/login',
        component: Login,
        label: 'Login',
        props: { exact: true }
      },
      {
        key: ROUTES.ForgotPassword,
        path: '/login/forgot-password',
        component: ForgotPassword,
        label: 'Forgot password?',
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
        label: 'Pending Confirm Email',
        props: { exact: true }
      },
      {
        key: ROUTES.ResendConfirmation,
        path: '/sign-up/resend-confirmation-email',
        component: ResendConfirmation,
        label: 'Resend Confirmation Email',
        props: { exact: true }
      },
      {
        key: ROUTES.ResetPassword,
        path: '/login/reset-password/:token',
        component: ResetPassword,
        label: 'Reset Password',
        props: { exact: true }
      },
      {
        key: ROUTES.SignUp,
        path: '/sign-up',
        component: SignUp,
        label: 'Sign Up',
        props: { exact: true }
      },
    ]
  },
 
]

export let ROUTE_MAP = {}

// Compile the routes to a flat list
compileRoutes(ROUTE_MAP, routes)