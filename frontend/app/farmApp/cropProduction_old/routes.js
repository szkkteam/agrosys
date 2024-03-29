import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Redirect, generatePath } from 'react-router-dom'

import {
  CropProductionFeatureAppBar
} from 'farmApp/cropProduction/components'

import {
  CropProductionOverview,
  CropProductionDetail,
  CropProductionCreate,
  CropProductionEdit,
  CropProductionTask,
  CropProductionField,
} from 'farmApp/cropProduction/pages'

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
  CropProduction: 'CropProduction',
  /**
   * Main view. The route is responsible to show all crops and seasons. 
   */
  CropProductionOverview: 'CropProductionOverview',
  /**
   * Specific crop and season view. The route is responsible to show only a specific crop in a given season
   */
  CropProductionDetail: 'CropProductionDetail',
  /**
   * Edit specific season view.
   */
  CropProductionEdit: 'CropProductionEdit',
  /**
   * Feature view tabs header. (For tasks, field, weather, analysis, etc...)
   */
  CropProductionFeatures: 'CropProductionFeatures',
  /**
   * Sub feature collection
   */
  CropProductionTask: 'CropProductionTask',
  CropProductionField: 'CropProductionField',
  

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
    key: ROUTES.CropProduction,
    path: '/crops',
    component: 'div', // Empty div is okay as a componenet, because we are using it as a route group
    routes: [
      {
        key: ROUTES.CropProductionOverview,
        path: '', // Match the same route
        component: CropProductionOverview,
        props: { exact: true }, // Exact is needed, because subroutes can be shown separately
      },
      {
        // TODO: Do we need the season id here?
        key: ROUTES.CropProductionDetail,
        path: '/:id/seasons/:id', // We need the crop id and the season id
        component: CropProductionDetail,
      },
      {
        key: ROUTES.CropProductionCreate,
        path: '/seasons/new', // We need the crop id and the season id
        component: CropProductionCreate,
      },
      {
        key: ROUTES.CropProductionEdit,
        path: '/seasons/:id', // We need the crop id and the season id
        component: CropProductionEdit,
      },
      // If going with tab solution
      {
        key: ROUTES.CropProductionFeatures,
        path: '/views/:tab?', // We need the crop id and the season id
        component: CropProductionFeatureAppBar,
        props: { exact: true }, // Exact is needed, because subroutes can be shown separately
        routes: [
          {
            key: ROUTES.CropProductionTask,
            path: '/crops/views/tasks', // We need the crop id and the season id
            component: CropProductionTask,
            props: { absolute: true } // Absolute is needed because parent has parameter in route
          },
          {
            key: ROUTES.CropProductionField,
            path: '/crops/views/fields', // We need the crop id and the season id
            component: CropProductionField,
            props: { absolute: true } // Absolute is needed because parent has parameter in route
          },
        ]
      },
    ]
  }
]
