import React, { useEffect } from 'react'
import Content from 'components/Layout/Content'
import HeaderContent from 'components/Layout/HeaderContent'
/**
 * Production
 */
import {
  CropProductionOverview,
  CropProductionTimeline
} from './pages'


import {
  CropSettings
} from './crop/pages'

import {
  ProductionTimeline,
  ProductionSettings,
} from './production/pages'

import {
  SeasonProduction,
  SeasonCreate,
} from './season/pages'

import {
  FieldSeasonCreate,
  FieldProductionList,
} from './field/pages'

import {
  TaskProductionList
} from './task/pages'


import ProductionLayoutHeader from './production/components/ProductionLayoutHeader'
import CropProductionOverviewHeader from './components/CropProductionOverviewHeader'
import CropProductionMyCropsHeader from './components/CropProductionMyCropsHeader'

import { ProtectedRoute } from 'utils/route'

/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {
  /**
   * Productions keys
   */
  CropProduction: 'CropProduction',

  // CropProduction
  CropProductionTimeline: 'CropProductionTimeline',
  CropProductionOverview: 'CropProductionOverview',

  // Crop
  Crop: 'Crop',

  CropSettings: 'CropSettings',

  // Production
  Production: 'Production',
  ProductionTimeline: 'ProductionTimeline',
  ProductionCreate: 'ProductionCreate',
  ProductionDetailSummary: 'ProductionDetailSummary',
  ProductionDetailTask: 'ProductionDetailTask',
  ProductionDetailField: 'ProductionDetailField',
  ProductionDetailAnalysis: 'ProductionDetailAnalysis',
  ProductionDetailWeather: 'ProductionDetailWeather',
  ProductionSettings: 'ProductionSettings',
  // Field
  FieldCreateDraw: 'FieldCreateDraw',
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
    key: ROUTES.CropProduction,
    path: '/crops',
    component: CropProductionMyCropsHeader,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      // Crops overall view (Timeline). Show all crops , productions and seasons
      {
        key: ROUTES.Crop,
        path: '/crops/overview',
        component: CropProductionOverviewHeader,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        //props: { exact: true },
        routes: [
          {
            key: ROUTES.CropProductionTimeline,
            path: '/crops/overview',
            component: CropProductionOverview,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.CropProductionOverview,
            path: '/crops/overview/timeline',
            component: CropProductionTimeline,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },    
        ],
      },
      {
        key: ROUTES.ProductionCreate,
        path: '/crops/:cropId/seasons/new',
        component: SeasonCreate,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {
        key: ROUTES.CropSettings,
        path: '/crops/:cropId/settings',
        component: CropSettings,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },      
      // Specific crop and production view (Subtabs). Show all resource to that specific production      
      {
        key: ROUTES.Production,
        path: '/crops/:cropId/seasons/:productionId',
        component: ProductionLayoutHeader,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        routes: [
          {
            key: ROUTES.ProductionDetailSummary,
            path: '/crops/:cropId/seasons/:productionId',
            component: SeasonProduction,
            routeComponent: ProtectedRoute,
            props: { exact: true }            
          },
          // TODO: Maybe move the timeline into the summary page?
          {
            key: ROUTES.ProductionTimeline,
            path: '/crops/:cropId/seasons/:productionId/timeline',
            component: ProductionTimeline,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },        
          {
            key: ROUTES.ProductionSettings  ,
            path: '/crops/:cropId/seasons/:productionId/settings',
            component: ProductionSettings  ,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },                  
          {
            key: ROUTES.ProductionDetailTask,
            path: '/crops/:cropId/seasons/:productionId/tasks',
            component: TaskProductionList,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.FieldCreateDraw,
            path: '/crops/:cropId/seasons/:productionId/parcels/new',
            component: FieldSeasonCreate,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ProductionDetailField,
            path: '/crops/:cropId/seasons/:productionId/parcels',
            component: FieldProductionList,
            routeComponent: ProtectedRoute,
            props: { exact: false } // Set to false, to prevent error in parcel/new page. This must be the last
          },
          {
            key: ROUTES.ProductionDetailAnalysis,
            path: '/crops/:cropId/seasons/:productionId/analysis',
            component: 'div',
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ProductionDetailWeather,
            path: '/crops/:cropId/seasons/:productionId/weather',
            component: 'div',
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          
        ]
      }     
    ]
}
]
