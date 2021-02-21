import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Redirect, generatePath } from 'react-router-dom'

import {
  CropProductionAppBar
} from 'farmApp/cropProduction/components'

import {
  CropProductionOverview,
  CropProductionDetail,
  CropProductionCreate,
  CropProductionEdit,
  CropProductionTask,
} from 'farmApp/cropProduction/pages'

import {
  seasonOverview,
  seasonDetail,
  ROUTES as seasonRoutesKeys,
} from 'farmApp/cropProduction/season/routes'

import {
  cropOverview,
  cropDetail,
  ROUTES as cropRoutesKeys,
} from 'farmApp/cropProduction/crop/routes'


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
  

  CropProductionDashboard: 'CropProductionDashboard',
  CropProductionTimeline: 'CropProductionTimeline',

  // Specific crop
  CropProductionUserCrop: 'CropProductionUserCrop',

  ...cropRoutesKeys,
  ...seasonRoutesKeys,



  CropProductionDetail: 'CropProductionDetail',
  // CropProduction
  CropProductionTimeline: 'CropProductionTimeline',
  CropProductionOverview: 'CropProductionOverview',
  // Crop
  Crop: 'Crop',
  CropDetail: 'CropDetail',
  CropDashboard: 'CropDashboard',
  // Season
  CropProductionSeasonContainer: 'CropProductionSeasonContainer',
  CropProductionSeasonSummary: 'CropProductionSeasonSummary',
  CropSettings: 'CropSettings',
  // Production
  Production: 'Production',
  ProductionTimeline: 'ProductionTimeline',
  ProductionCreate: 'ProductionCreate',
  ProductionDetailSummary: 'ProductionDetailSummary',
  ProductionDetailTask: 'ProductionDetailTask',
  ProductionDetailField: 'ProductionDetailField',
  ProductionDetailFieldList: 'ProductionDetailFieldList',
  ProductionDetailAnalysis: 'ProductionDetailAnalysis',
  ProductionDetailWeather: 'ProductionDetailWeather',
  ProductionSettings: 'ProductionSettings',
  // Field
  FieldCreateDraw: 'FieldCreateDraw',
  CropProductionFieldProduction: 'CropProductionFieldProduction',
  CropProductionFieldProductionList: 'CropProductionFieldProductionList',

}

const PlaceHolder = styled.div`
  display: none;
  & + div {
    height: 100%;
  }
`

const RedirectToOverview = (props) => {
  return <Redirect from="/crops" to="/crops/overview/all" />
}

const PlaceholderDiv = props => <PlaceHolder />

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

import { Button } from '@material-ui/core'
import { withLinkComponent } from 'utils/hoc'
const Link = withLinkComponent(Button)

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
        component: 'div',
        props: { exact: true }, // Exact is needed, because subroutes can be shown separately
        routes: [
          {
            key: ROUTES.CropProductionTask,
            path: '/crops/views/task', // We need the crop id and the season id
            component: 'div',
            props: { absolute: true } // Absolute is needed because parent has parameter in route
          },
          {
            key: ROUTES.CropProductionField,
            path: '/crops/views/field', // We need the crop id and the season id
            component: 'div',
            props: { absolute: true } // Absolute is needed because parent has parameter in route
          },
        ]
      },
    ]
  }

/*
{
        key: 'CropProductionRedirect',
        path: '',
        component: RedirectToOverview,
        props: { exact: true },        
      },
      {
        // TODO: This will be used as a jump point (navigate back)
        key: ROUTES.CropProductionOverview,
        path: '/overview/:cropId?',
        component: CropProductionAppBar,
        routes: [
          {
            // TODO: This is will be used as a jump point (navigate back to crop all)
            // TODO: CropProduction componenets
            key: ROUTES.CropProductionDashboard,
            path: '/all',
            props: { exact: true },        
            component: CropProductionOverview,
          },
          ...cropOverview,
          ...seasonOverview
        ]
      },
      // Specific crops should come here
      {
        key: ROUTES.CropProductionTimeline,
        path: '/timeline',
        component: () => <div>Crop timeline</div>
      },
      ...cropDetail,
      ...seasonDetail,
      {
       
      },
      {
        key: "Group depply nested views",
        path: '/:cropId/season/:seasonId',
        component: 'div',
        routes: [
        
        ]
        
      }
*/

]
