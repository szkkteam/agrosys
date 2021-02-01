import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'
import { Redirect } from 'react-router-dom'

import {
  DashboardAppBar
} from 'farmApp/dashboard/components'

import {
    DashboardHome
  } from 'farmApp/dashboard/pages'

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
  // Dashboard
  Dashboard: 'Dashboard',  
  DashboardOverview: 'DashboardOverview',  
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
  {
    key: "EmptyEntryTODO",
    path: '/',
    props: { exact: true},
    component: () => <Redirect from="/" to="/dashboard" />
  },
  {
    key: ROUTES.Dashboard,
    path: '/dashboard/:tab?',
    component: DashboardAppBar,
    routes: [
      // Dashboard routes
      {
        key: ROUTES.DashboardOverview,
        path: '/overview',
        component: DashboardHome,
        props: { exact: true}
      },
    ]
  }
   
]