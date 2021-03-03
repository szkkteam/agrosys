import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Redirect, generatePath } from 'react-router-dom'

import {
  OperationAppBar
} from 'farmApp/operation/components'

import {
  OperationMapOverview,
  OperationTableOverview
} from 'farmApp/operation/pages'

import { ProtectedRoute } from 'utils/route'

/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {
  /**
   * Entry point for navrails
   */
  Operation: 'Operation',
  OperationViews: 'OperationViews',
  OperationMap: 'OperationMap',
  OperationTable: 'OperationTable',
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

/*
<Link to={ROUTES.MachineryDatabase}>                
                Go to machinery database
            </Link>
*/

export const routes = [  
  {
    // TODO: This is used by the rail
    key: ROUTES.Operation,
    path: '/operations',
    component: 'div', // Empty div is okay as a componenet, because we are using it as a route group
    routes: [
      {
        key: ROUTES.OperationViews,
        path: '/:tab?', // Match the same route
        component: OperationAppBar,
        //props: { exact: true }, 
        routes: [
          {
            key: ROUTES.OperationMap,
            path: '/operations/map',
            component: OperationMapOverview,
            props: { absolute: true}
          },
          {
            key: ROUTES.OperationTable,
            path: '/operations/table',
            component: OperationTableOverview,
            props: { absolute: true}
          }
        ]
      },      
    ]
  }
]