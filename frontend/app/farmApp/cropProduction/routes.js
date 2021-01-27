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
  CropSettings,
  CropDetail
} from './crop/pages'

import {
  ProductionTimeline,
  ProductionSettings,
} from './production/pages'

import {
  SeasonProduction,
  SeasonCreate,
  SeasonSummary,
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
  CropDetail: 'CropDetail',

  // Season
  CropProductionSeason: 'CropProductionSeason',
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
        path: '',
        component: CropProductionOverview,
        routeComponent: ProtectedRoute,
        //layoutComponent: HeaderContent,
        props: { exact: true },        
      },
      /*
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
      */
      {
        key: ROUTES.CropDetail,
        path: '/:cropId',
        component: PlaceholderDiv,
        routeComponent: ProtectedRoute,
        //props: { exact: true },
        /**
         * A crop alatt először a crop/summary nézetet kapjuk meg. Ezt azt tudja, hogy KPI-ket az aktuális szezonról,
         * majd mutatja a szezonokat.
         * Töltse be alapból szezon KPI nézetet. Jobb oldalon a szezon választó
         * Ez a route redirecteljen az aktuális szezon routera
         * 
         */
        routes: [
          {
            /**
             * This should handle the crop-season overview. Get the current season, and provide 
             */
            key: ROUTES.CropProductionSeasonContainer,
            path: '/seasons',
            component: PlaceholderDiv,
            routeComponent: ProtectedRoute,
            //props: { exact: true }
            routes: [
              // Exact routes must come before layout routes
              {
                key: ROUTES.ProductionCreate,
                path: '/new',
                component: SeasonCreate,
                routeComponent: ProtectedRoute,
                props: { exact: true }
              },
              {
                key: ROUTES.CropProductionSeason,
                path: '',
                component: ProductionLayoutHeader,
                routeComponent: ProtectedRoute,
                layoutComponent: HeaderContent,
                routes: [
                  {
                    key: ROUTES.CropProductionSeasonSummary,
                    path: '',
                    component: SeasonProduction,
                    routeComponent: ProtectedRoute,
                    props: { exact: true }
                  },
                  {
                    key: ROUTES.ProductionDetailTask,
                    path: '/:seasonId/tasks',
                    component: TaskProductionList,
                    routeComponent: ProtectedRoute,
                    props: { exact: true }
                  },
                  {
                    key: ROUTES.CropProductionFieldProduction,
                    path: '/:seasonId/parcels',
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
                ]
              },
            ]
          },
          {
            key: ROUTES.CropSettings,
            path: '/settings',
            component: CropSettings,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          }, 
        ]
      },
      /*
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
      */      
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
          /*    
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
          */
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
