import React, { useEffect } from 'react'
import { Route, Switch, Redirect, matchPath } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'
import Content from 'components/Layout/Content'
import HeaderContent from 'components/Layout/HeaderContent'

import {
  DashboardHome
} from 'farmApp/dashboard/pages'

/**
 * Resources
 */
import {
  FarmCreate,
  FarmDashboard,
} from 'resource/farm/pages'

import {
  BlockList,
  BlockDetail,
  BlockCreateDraw,
  BlockCreateUpload,
  BlockCreateLPIS
} from 'resource/block/pages'

import {
  WorkerList,
} from 'resource/worker/pages'

import {
  MachineryList
} from 'resource/machinery/pages'

import {
  EntityList
} from 'resource/entity/pages'

import {
  FieldCreateDraw,
  FieldList,
} from 'resource/field/pages'

import {
  InventoryList
} from 'resource/inventory/pages'

import {
  ResourceHeaderTab
} from 'resource/resource/pages'

/**
 * Finance
 */

import {
  SaleDashboard
} from 'finance/sale/pages'

import {
  ExpenseDashboard
} from 'finance/expense/pages'

import {
  BudgetDashboard
} from 'finance/budget/pages'

/**
 * Reports
 */

import {
  ReportDashboard
} from 'report/report/pages'

/**
 * Production
 */

import {
  CropOverview,
  CropTimeline
} from 'production/crop/pages'

import {
  ProductionSummary,
  ProductionCreate,
  ProductionDetail,
  ProductionTimeline,
} from 'production/production/pages'

import {
  TaskList
} from 'production/task/pages'

import {
  ProductionHeaderTab
} from 'production/production/pages'

import ProductionHeaderTabs from 'production/production/components/ProductionHeaderTabs'

/**
 * Site
 */

import {
  ForgotPassword,
  Login,
  Logout,
  PendingConfirmation,
  Profile,
  SignUp,
  ResendConfirmation,
  ResetPassword,
} from 'security/pages'

import {
  Dashboard,
  NotFound,
} from 'site/pages'

import { AnonymousRoute, ProtectedRoute } from 'utils/route'


/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {
  // Dashboard
  DashboardHome: 'DashboardHome',

  // Report
  ReportDashboard: 'ReportDashboard',

  // Sale
  SaleDashboard: 'SaleDashboard',

  // Expense
  ExpenseDashboard: 'ExpenseDashboard',

  // Budget
  BudgetDashboard: 'BudgetDashboard',

  // Farm
  FarmCreate: 'FarmCreate',
  FarmDashboard: 'FarmDashboard',

  /**
   * Resources Keys
   */
  ResourceHeaderTab: 'ResourceHeaderTab',

  // Block
  BlockList: 'BlockList',
  BlockDetail: 'BlockDetail',
  BlockCreateDraw: 'BlockCreateDraw',
  BlockCreateUpload: 'BlockCreateUpload',
  BlockCreateLPIS: 'BlockCreateLPIS',
  // Worker
  WorkerList: 'WorkerList',

  // Machinery
  MachineryList: 'MachineryList',
  // Entitiy
  EntityList: 'EntityList',
  /**
   * Productions keys
   */
  ProductionHeaderTab: 'ProductionHeaderTab',

  // Crop
  CropTimeline: 'CropTimeline',
  CropOverview: 'CropOverview',

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
  // Field
  FieldCreateDraw: 'FieldCreateDraw',


  // Inventory
  InventoryList: 'InventoryList',
  
  ForgotPassword: 'ForgotPassword',
  Login: 'Login',
  Logout: 'Logout',
  PendingConfirmation: 'PendingConfirmation',
  Profile: 'Profile',
  ResendConfirmation: 'ResendConfirmation',
  ResetPassword: 'ResetPassword',  
  SignUp: 'SignUp',
  Styles: 'Styles',  
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
  // Dashboard routes
  {
    key: ROUTES.DashboardHome,
    path: '/',
    component: DashboardHome,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Report routes  
  {
    key: ROUTES.ReportDashboard,
    path: '/reports',
    component: ReportDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Sale routes  
  {
    key: ROUTES.SaleDashboard,
    path: '/sales',
    component: SaleDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Expense routes  
  {
    key: ROUTES.ExpenseDashboard,
    path: '/expenses',
    component: ExpenseDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Budget routes  
  {
    key: ROUTES.BudgetDashboard,
    path: '/budgets',
    component: BudgetDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Farm routes
  {
    key: ROUTES.FarmCreate,
    path: '/farms/new',
    component: FarmCreate,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.FarmDashboard,
    path: '/farms/dashboard',
    component: FarmDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  /**
   * Resources routes
   */
  {
    key: ROUTES.ResourceHeaderTab,
    path: '/resource',
    component: ResourceHeaderTab,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      {
        key: ROUTES.BlockCreateDraw,
        path: '/resource/fields/new/draw',
        component: BlockCreateDraw,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {    
        key: ROUTES.BlockCreateUpload, // This must come before BlockList
        path: '/resource/fields/new/upload',
        component: BlockCreateUpload,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {    
        key: ROUTES.BlockCreateLPIS, // This must come before BlockList
        path: '/resource/fields/new/lpis',
        component: BlockCreateLPIS,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {    
        key: ROUTES.BlockDetail, // This must come before BlockList
        path: '/resource/fields/:id/detail',
        component: BlockDetail,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },      
      {        
        key: ROUTES.BlockList, //Block list must be in the end of the list, because it's accepting multiple routes (exact=false)
        path: '/resource/fields',
        component: BlockList,
        routeComponent: ProtectedRoute,
      },
      // Worker routes    
      {
        key: ROUTES.WorkerList,
        path: '/resource/workers',
        component: WorkerList,
        routeComponent: ProtectedRoute,
        //props: { exact: true }
      },
      // Machinery routes  
      {
        key: ROUTES.MachineryList,
        path: '/resource/machinery',
        component: MachineryList,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      // Entity routes  
      {
        key: ROUTES.EntityList,
        path: '/resource/entities',
        component: EntityList,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
    ]
  },
  /**
   * Production routes
   */
  {
    key: ROUTES.ProductionHeaderTab,
    path: '/crops',
    component: ProductionHeaderTab,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      // Crops overall view (Timeline). Show all crops , productions and seasons
      {
        key: ROUTES.CropOverview,
        path: '/crops',
        component: CropOverview,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {
        key: ROUTES.CropTimeline,
        path: '/crops/timeline',
        component: CropTimeline,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },      
      {
        key: ROUTES.ProductionCreate,
        path: '/crops/:cropId/productions/new',
        component: ProductionCreate,
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
      },
      
      

  ]
  },
  // Inventory routes  
  {
    key: ROUTES.InventoryList,
    path: '/inventory',
    component: InventoryList,
    routeComponent: ProtectedRoute,
    props: { exact: false }
  },
  // Common routes
  {
    key: ROUTES.ForgotPassword,
    path: '/login/forgot-password',
    component: ForgotPassword,
    routeComponent: AnonymousRoute,
    label: 'Forgot password?',
    props: { exact: true }
  },
  {
    key: ROUTES.Login,
    path: '/login',
    component: Login,
    routeComponent: AnonymousRoute,
    label: 'Login',
    props: { exact: true }
  },
  {
    key: ROUTES.Logout,
    path: '/logout',
    component: Logout,
    label: 'Logout',
    props: { exact: true }
  },
  {
    key: ROUTES.PendingConfirmation,
    path: '/sign-up/pending-confirm-email',
    component: PendingConfirmation,
    routeComponent: AnonymousRoute,
    label: 'Pending Confirm Email',
    props: { exact: true }
  },
  {
    key: ROUTES.Profile,
    path: '/profile',
    component: Profile,
    routeComponent: ProtectedRoute,
    label: 'Profile',
    props: { exact: true }
  },
  {
    key: ROUTES.ResendConfirmation,
    path: '/sign-up/resend-confirmation-email',
    component: ResendConfirmation,
    routeComponent: AnonymousRoute,
    label: 'Resend Confirmation Email',
    props: { exact: true }
  },
  {
    key: ROUTES.ResetPassword,
    path: '/login/reset-password/:token',
    component: ResetPassword,
    routeComponent: AnonymousRoute,
    label: 'Reset Password',
    props: { exact: true }
  },
    {
    key: ROUTES.SignUp,
    path: '/sign-up',
    component: SignUp,
    routeComponent: AnonymousRoute,
    label: 'Sign Up',
    props: { exact: true }
  },
]

/**
 * ROUTE_MAP: A public lookup for route details by key
 */
export const ROUTE_MAP = {}

const complieRoutes = (routes) => {
  routes.forEach((route) => {
    let { component, key, label, path, routeComponent, props } = route
  
    if (!component) {
      throw new Error(`component was not specified for the ${key} route!`)
    }
    if (!path) {
      throw new Error(`path was not specified for the ${key} route!`)
    }

    if (route.routes?.length) {
      complieRoutes(route.routes)
    }
  
    ROUTE_MAP[key] = {
      path,
      toPath: compile(path),
      component,
      routeComponent: routeComponent || Route,
      label: label || startCase(key),
      props,
    }
  })
}
complieRoutes(routes)
console.log(ROUTE_MAP)

// TODO: How to add the 404 route?
// cachedRoutes.push(<Route component={NotFound} key="*" />)
 
/*
  FIXME: Somehow for nested rotues the whole tree is re-rendered
*/
const CustomRouter = ({routes}) => {
  return (
      <Switch>
        {routes.map(({key, routes: children, layoutComponent: Layout = 'div'}) => {
          const { component: Component, path, props: rest, routeComponent: RouteComponent } = ROUTE_MAP[key]
          return (
            <RouteComponent 
              path={path}
              key={path}
              component={props => {                
                return (
                  <Layout>
                    <Component {...props} /> 
                    {children && children.length > 0 ?
                      <CustomRouter {...props} routes={children} />
                    : null}
                  </Layout>
              )}}
              {...rest}
            />
          )
        })}
      </Switch>
  )
}

export default CustomRouter
