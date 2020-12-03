import React, { useEffect } from 'react'
import { Route, Switch, Redirect, matchPath } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'
import HeaderContent from 'components/Layout/HeaderContent'

import {
  DashboardHome
} from 'farmApp/dashboard/pages'

import {
  FarmCreate,
  FarmDashboard,
} from 'farmApp/farm/pages'

import {
  ReportDashboard
} from 'farmApp/report/pages'

import {
  SaleDashboard
} from 'farmApp/sale/pages'

import {
  ExpenseDashboard
} from 'farmApp/expense/pages'

import {
  BudgetDashboard
} from 'farmApp/budget/pages'

import {
  LoanDashboard
} from 'farmApp/loan/pages'

import {
  TransactionDashboard
} from 'farmApp/transaction/pages'

import {
  BlockList,
  BlockCreateDraw,
  BlockCreateUpload,
  BlockCreateLPIS
} from 'farmApp/block/pages'

import {
  WorkerList,
} from 'farmApp/worker/pages'

import {
  MachineryList
} from 'farmApp/machinery/pages'

import {
  EntityList
} from 'farmApp/entity/pages'

import {
  StorageList
} from 'farmApp/storage/pages'

import {
  ProductionMultiView,
  ProductionCreate,
  ProductionDetail,
} from 'farmApp/production/pages'

import {
  ItemList
} from 'farmApp/item/pages'

import {
  PlanList
} from 'farmApp/plan/pages'

import {
  InventoryList
} from 'farmApp/inventory/pages'

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
  ResourcesHeader
} from 'farmApp/resource/components'

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

  // Loan
  LoanDashboard: 'LoanDashboard',

  // Transaction
  TransactionDashboard: 'TransactionDashboard',
  
  // Farm
  FarmCreate: 'FarmCreate',
  FarmDashboard: 'FarmDashboard',

  /**
   * Resources Keys
   */
  ResourcesHeader: 'ResourcesHeader',

  // Block
  BlockList: 'BlockList',
  BlockCreateDraw: 'BlockCreateDraw',
  BlockCreateUpload: 'BlockCreateUpload',
  BlockCreateLPIS: 'BlockCreateLPIS',
  // Worker
  WorkerList: 'WorkerList',

  // Machinery
  MachineryList: 'MachineryList',
  // Entitiy
  EntityList: 'EntityList',
  // Storage
  StorageList: 'StorageList',
  // Production
  ProductionMultiView: 'ProductionMultiView',
  ProductionCreate: 'ProductionCreate',
  ProductionDetail: 'ProductionDetail',
  // Item
  ItemList: 'ItemList',
  // Plan
  PlanList: 'PlanList',
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
  // Loans routes  
  {
    key: ROUTES.LoanDashboard,
    path: '/loans',
    component: LoanDashboard,
    routeComponent: ProtectedRoute,
    props: { exact: true}
  },
  // Transactions routes  
  {
    key: ROUTES.TransactionDashboard,
    path: '/transactions',
    component: TransactionDashboard,
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
    key: ROUTES.ResourcesHeader,
    path: '/resource',
    component: ResourcesHeader,
    routeComponent: ProtectedRoute,
    layoutComponent: HeaderContent,
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
      // Storage routes  
      {
        key: ROUTES.StorageList,
        path: '/resource/storages',
        component: StorageList,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
    ]
  },

  // Production routes
  {
    key: ROUTES.ProductionCreate,
    path: '/productions/new',
    component: ProductionCreate,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.ProductionMultiView,
    path: '/productions/multi',
    component: ProductionMultiView,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  {
    key: ROUTES.ProductionDetail,
    path: '/productions/:id',
    component: ProductionDetail,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  // Item routes    
  {
    key: ROUTES.ItemList,
    path: '/items',
    component: ItemList,
    routeComponent: ProtectedRoute,
    props: { exact: true }
  },
  // Plan routes  
  {
    key: ROUTES.PlanList,
    path: '/plans',
    component: PlanList,
    routeComponent: ProtectedRoute,
    props: { exact: true }
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

console.log("headerComntent: ", HeaderContent)

// TODO: How to add the 404 route?
// cachedRoutes.push(<Route component={NotFound} key="*" />)

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