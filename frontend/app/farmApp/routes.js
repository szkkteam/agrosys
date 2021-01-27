
import {
  DashboardHome
} from 'farmApp/dashboard/dashboard/pages'

import {
  routes as reportRoutes,
  ROUTES as reportRoutesKeys,
} from 'farmApp/report/routes'

import {
  routes as resourceRoutes,
  ROUTES as resourceRoutesKeys,
} from 'farmApp/resource/routes'

import {
  routes as productionRoutes,
  ROUTES as productionRoutesKeys,
} from 'farmApp/cropProduction/routes'

/**
 * Resources
 */
import {
  FarmCreate,
  FarmDashboard,
} from 'farmApp/resource/farm/pages'

/**
 * Finance
 */

import {
  SaleDashboard
} from 'farmApp/finance/sale/pages'

import {
  ExpenseDashboard
} from 'farmApp/finance/expense/pages'

import {
  BudgetDashboard
} from 'farmApp/finance/budget/pages'

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

  /**
   * Report keys
   */
  ...reportRoutesKeys,

  // Sale
  SaleDashboard: 'SaleDashboard',

  // Expense
  ExpenseDashboard: 'ExpenseDashboard',

  // Budget
  BudgetDashboard: 'BudgetDashboard',

  // Farm
  FarmCreate: 'FarmCreate',
  FarmDashboard: 'FarmDashboard',
  
  ...productionRoutesKeys,
  ...resourceRoutesKeys,
}
console.debug("ROUTE KEYS: ", ROUTES)
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
  ...reportRoutes,
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
  /*
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
  */
  /**
   * Resources routes
   */
  ...resourceRoutes,
  /**
   * Production routes
   */
  ...productionRoutes,
  
]
