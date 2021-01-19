import React, { useEffect } from 'react'
import Content from 'components/Layout/Content'

import {
  WorkerList,
} from 'farmApp/resource/worker/pages'

import {
  MachineryList
} from 'farmApp/resource/machinery/pages'

import {
  EntityList
} from 'farmApp/resource/entity/pages'

import {
    InventoryList
  } from 'farmApp/resource/inventory/pages'

import {
  ResourceHeaderTab
} from 'farmApp/resource/pages'

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
   
    /**
     * Resources Keys
     */
    Resource: 'Resource',
  
    // Worker
    WorkerList: 'WorkerList',
  
    // Machinery
    MachineryList: 'MachineryList',
    // Entitiy
    EntityList: 'EntityList',
    /**
     * Productions keys
     */
    Production: 'Production',
  
  
  
    // Inventory
    InventoryList: 'InventoryList',  
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
    key: ROUTES.Resource,
    path: '/resource',
    component: ResourceHeaderTab,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
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
  // Inventory routes  
  {
    key: ROUTES.InventoryList,
    path: '/inventory',
    component: InventoryList,
    routeComponent: ProtectedRoute,
    props: { exact: false }
  },
]