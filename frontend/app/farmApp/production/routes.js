import React, { useEffect } from 'react'
import Content from 'components/Layout/Content'
import HeaderContent from 'components/Layout/HeaderContent'
/**
 * Production
 */

import {
  CropOverview,
  CropTimeline,
  CropSettings
} from 'farmApp/production/crop/pages'

import {
  ProductionSummary,
  ProductionCreate,
  ProductionDetail,
  ProductionTimeline,
  ProductionSettings,
} from 'farmApp/production/production/pages'


import {
  FieldCreateDraw,
  FieldList,
} from 'farmApp/production/field/pages'

import {
  TaskList
} from 'farmApp/production/task/pages'

import {
  ProductionHeaderTab
} from 'farmApp/production/production/pages'

import ProductionHeaderTabs from 'farmApp/production/production/components/ProductionHeaderTabs'
import CropHeaderTabs from 'farmApp/production/crop/components/CropHeaderTabs'

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
  Production: 'Production',

  // Crop
  Crop: 'Crop',
  CropTimeline: 'CropTimeline',
  CropOverview: 'CropOverview',
  CropSettings: 'CropSettings',

  // Production
  ProductionMultiView: 'ProductionMultiView',
  ProductionTimeline: 'ProductionTimeline',
  ProductionCreate: 'ProductionCreate',
  ProductionDetail: 'ProductionDetail',
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
    key: ROUTES.Production,
    path: '/crops',
    component: ProductionHeaderTab,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      // Crops overall view (Timeline). Show all crops , productions and seasons
      {
        key: ROUTES.Crop,
        path: '/crops/overview',
        component: CropHeaderTabs,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        //props: { exact: true },
        routes: [
          {
            key: ROUTES.CropOverview,
            path: '/crops/overview',
            component: CropOverview,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.CropTimeline,
            path: '/crops/overview/timeline',
            component: CropTimeline,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },    
        ],
      },
      {
        key: ROUTES.ProductionCreate,
        path: '/crops/:cropId/productions/new',
        component: ProductionCreate,
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
        key: ROUTES.ProductionDetail,
        path: '/crops/:cropId/productions/:productionId',
        component: ProductionHeaderTabs,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        routes: [
          {
            key: ROUTES.ProductionDetailSummary,
            path: '/crops/:cropId/productions/:productionId',
            component: ProductionSummary,
            routeComponent: ProtectedRoute,
            props: { exact: true }            
          },
          // TODO: Maybe move the timeline into the summary page?
          {
            key: ROUTES.ProductionTimeline,
            path: '/crops/:cropId/productions/:productionId/timeline',
            component: ProductionTimeline,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },        
          {
            key: ROUTES.ProductionSettings  ,
            path: '/crops/:cropId/productions/:productionId/settings',
            component: ProductionSettings  ,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },                  
          {
            key: ROUTES.ProductionDetailTask,
            path: '/crops/:cropId/productions/:productionId/tasks',
            component: TaskList,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.FieldCreateDraw,
            path: '/crops/:cropId/productions/:productionId/parcels/new',
            component: FieldCreateDraw,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ProductionDetailField,
            path: '/crops/:cropId/productions/:productionId/parcels',
            component: FieldList,
            routeComponent: ProtectedRoute,
            props: { exact: false } // Set to false, to prevent error in parcel/new page. This must be the last
          },
          {
            key: ROUTES.ProductionDetailAnalysis,
            path: '/crops/:cropId/productions/:productionId/analysis',
            component: ProductionDetail,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ProductionDetailWeather,
            path: '/crops/:cropId/productions/:productionId/weather',
            component: ProductionDetail,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          
        ]
      }     
    ]
}
]
