import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Redirect, generatePath } from 'react-router-dom'

import {
  PlanAppBar
} from 'farmApp/plan/components'

import {
  CropPlanOverview,
  CropPlanCreate
} from 'farmApp/plan/pages'

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
  Plan: 'Plan',
  PlanViews: 'PlanViews',
  /**
   * CropPlan main view
   */
  PlanCropPlan: 'PlanCropPlan',
  PlanCropPlanCreate: 'PlanCropPlanCreate',
  /**
   * FieldPlan main view
   */
  PlanFieldPlan: 'PlanFieldPlan',
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
    key: ROUTES.Plan,
    path: '/plans',
    component: 'div', // Empty div is okay as a componenet, because we are using it as a route group
    routes: [
      {
        key: ROUTES.PlanViews,
        path: '/:tab?',
        component: PlanAppBar,
        props: { exact: true }, 
        routes: [
          {
            key: ROUTES.PlanCropPlan,
            path: '/plans/crop-plan', // Match the same route
            component: CropPlanOverview,
            props: { absolute: true }, 
          },
          {
            key: ROUTES.PlanFieldPlan,
            path: '/plans/field-plan', // Match the same route
            component: 'div',
            props: { absolute: true }, 
          },
        ]
      },
            
      {
        key: ROUTES.PlanCropPlanCreate,
        path: '/season/:season/new', // Match the same route
        component: CropPlanCreate,
        //props: { exact: true }, 
      }
    ]
  }
]
