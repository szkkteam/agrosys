import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Redirect, generatePath } from 'react-router-dom'

import {
  CropProductionAppBar
} from 'farmApp/cropProduction/components'

import {
  CropProductionOverview
} from 'farmApp/cropProduction/pages'


import {
  seasonOverview,
  seasonCreate,
  seasonDetail,
  ROUTES as seasonRoutesKeys,
} from 'farmApp/cropProduction/season/routes'


/*
import Content from 'components/Layout/Content'
import HeaderContent from 'components/Layout/HeaderContent'
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
*/
import { ProtectedRoute } from 'utils/route'

/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {

  CropProduction: 'CropProduction',
  CropProductionOverview: 'CropProductionOverview',

  CropProductionDashboard: 'CropProductionDashboard',
  CropProductionTimeline: 'CropProductionTimeline',

  // Specific crop
  CropProductionUserCrop: 'CropProductionUserCrop',

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
    component: 'div',
    routes: [
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
          ...seasonOverview
        ]
      },
      // Specific crops should come here
      {
        key: ROUTES.CropProductionTimeline,
        path: '/timeline',
        component: () => <div>Crop timeline</div>
      },
      ...seasonCreate,
      ...seasonDetail,
      {
       
        /*
        // This will be used a jump point (Navigate back from deeply nested views)
        key: ROUTES.CropDetail,
        path: '/:cropId/seasons/:seasonId/views/:tab?',
        component: () => <div>Appbar</div>,
        routes: [
          {
            key: 'tasks',
            path: '/tasks',
            component: () => <div>tasks</div>,
          }
        ]
        */
      },
      {
        key: "Group depply nested views",
        path: '/:cropId/season/:seasonId',
        component: 'div',
        routes: [
          
          /*
          {
            key: 'CropAddS'
          }*/
        ]
        
      }
    ]
  }
/*
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
      {
        key: ROUTES.CropDashboard,
        path: '/dashboard',
        component: PlaceholderDiv,
        routeComponent: ProtectedRoute,
        //layoutComponent: HeaderContent,
        props: { exact: true },  
      },
      
    ]
  },
  {
    key: ROUTES.CropProductionDetail,
    path: '/crops/:cropId',
    component: ProductionLayoutHeader,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      {
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
            component: PlaceholderDiv,
            routeComponent: ProtectedRoute,
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
*/
]
