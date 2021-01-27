import React, { useEffect } from 'react'
import styled from 'styled-components'

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
  FieldProductionList,
} from './fieldProduction/pages'


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
        path: '/overview',
        component: CropProductionOverviewHeader,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        //props: { exact: true },
        routes: [
          {
            key: ROUTES.CropProductionTimeline,
            path: '',
            component: CropProductionOverview,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.CropProductionOverview,
            path: '/timeline',
            component: CropProductionTimeline,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },    
        ],
      },
      {
        key: ROUTES.ProductionCreate,
        path: '/:cropId/seasons/new',
        component: SeasonCreate,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {
        key: ROUTES.CropSettings,
        path: '/:cropId/settings',
        component: CropSettings,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },      
      // Specific crop and production view (Subtabs). Show all resource to that specific production      
      {
        key: ROUTES.Production,
        path: '/:cropId/seasons/:productionId',
        component: ProductionLayoutHeader,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        routes: [
          {
            key: ROUTES.ProductionDetailSummary,
            path: '',
            component: SeasonProduction,
            routeComponent: ProtectedRoute,
            props: { exact: true }            
          },
          // TODO: Maybe move the timeline into the summary page?
          {
            key: ROUTES.ProductionTimeline,
            path: '/timeline',
            component: ProductionTimeline,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },        
          {
            key: ROUTES.ProductionSettings  ,
            path: '/settings',
            component: ProductionSettings  ,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },                  
          {
            key: ROUTES.ProductionDetailTask,
            path: '/tasks',
            component: TaskProductionList,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.CropProductionFieldProduction,
            path: '/parcels',
            component: PlaceholderDiv,
            routeComponent: ProtectedRoute,
            props: { exact: false },
            routes: [
              {
                key: ROUTES.CropProductionFieldProductionList,
                path: '',
                component: FieldProductionList,
                routeComponent: ProtectedRoute,
                props: { exact: true },
              },
              {
                key: ROUTES.FieldCreateDraw,
                path: '/new',
                component: PlaceholderDiv,
                routeComponent: ProtectedRoute,
                props: { exact: true }
              },
            ]
          },
          {
            key: ROUTES.ProductionDetailAnalysis,
            path: '/analysis',
            component: 'div',
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ProductionDetailWeather,
            path: '/weather',
            component: 'div',
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          
        ]
      }     
    ]
}
]
